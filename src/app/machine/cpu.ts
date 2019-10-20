import {Injectable} from '@angular/core';
import {cloneCpuContext, CpuContextInterface, CpuContextFlags, emptyContext, resetCpuContext} from '../interfaces/cpuContext.interface';
import {Memory} from './memory';
import {Stack} from './stack';
import {Decoder} from './decoder';
import {Oscillator} from './oscillator';
import {Instruction, Opcode} from './instruction';
import {LoggerService} from '../services/logger.service';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cpu {

  private static INTERRUPT_VECTOR_ADDRESS = 0x04;
  private static PROGRAM_COUNTER_MASK = 0xff;

  private context: CpuContextInterface;
  private sleeping: boolean;
  private powered: boolean;
  private readonly interruptVector: number;
  private interruptEnabled: boolean;
  private interrupted: boolean;
  private contextStack: Array<CpuContextInterface>;

  private tickSub: Subscription;

  constructor(private memory: Memory,
              private stack: Stack,
              private decoder: Decoder,
              private oscillator: Oscillator,
              private logger: LoggerService) {
    this.interruptEnabled = true;
    this.context = emptyContext();
    this.interruptVector = Cpu.INTERRUPT_VECTOR_ADDRESS;
    this.sleeping = false;
    this.powered = false;
    this.contextStack = new Array<CpuContextInterface>();
  }

  public getContext(): CpuContextInterface {
    return this.context;
  }

  public updateFlags(): void {
    this.context.flags.z = (this.context.ac === 0);
    this.context.flags.n = (this.context.ac < 0);
  }

  public copyFlags(): CpuContextFlags {
    return {
      z: this.context.flags.z,
      n: this.context.flags.n
    };
  }

  public getFlags(): CpuContextFlags {
    return this.context.flags;
  }

  public nextPc(): number {
    this.setPc(this.context.pc + 1);
    return this.context.pc;
  }

  public tick(): void {
    if (this.isRunning()) {
      try {
        const opcode = this.fetchNextOpcode();
        const instruction = this.decodeInstruction(opcode);
        this.executeInstruction(instruction);
      } catch (e) {
        this.sleep();
        this.logger.error(e);
      }
    }
  }

  public returnFromInterrupt(): void {
    this.restoreContext();
    this.clearInterrupted();
    this.enableInterrupt();
  }

  public checkInterrupt(): void {
    if (this.wasInterrupted()) {
      this.disableInterrupt();
      this.saveContext();
      this.setPc(this.interruptVector);
    }
  }

  public saveContext(): void {
    this.contextStack.push(cloneCpuContext(this.context));
  }

  public restoreContext(): void {
    const context = this.contextStack.pop();
    if (context) {
      this.context = context;
    }
  }

  public wasInterrupted(): boolean {
    return this.interruptEnabled && this.interrupted;
  }

  public interrupt(): void {
    if (this.interruptEnabled) {
      this.interrupted = true;
    }
  }

  public powerOn(): void {
    this.powered = true;
    this.enableOscillator();
  }

  public powerOff(): void {
    this.disableOscillator();
    this.powered = false;
    this.reset(false);
    this.memory.resetAccess();
  }

  public isPowered(): boolean {
    return this.powered;
  }

  public sleep(): void {
    this.disableOscillator();
    this.sleeping = true;
  }

  public awake() {
    this.sleeping = false;
    this.enableOscillator();
  }

  public isSleeping(): boolean {
    return this.sleeping;
  }

  public reset(eraseMemory: boolean = false): void {
    resetCpuContext(this.context);
    this.getStack().erase();
    if (eraseMemory) {
      this.getMemory().erase();
    }
  }

  public stackPop(): number {
    return this.stack.pop();
  }

  public stackPush(value: number): void {
    return this.stack.push(value);
  }

  public readMemory(address: number): number {
    return this.memory.read(address);
  }

  public writeMemory(address: number, value: number): void {
    this.memory.write(address, value);
  }

  public setOscillator(oscillator: Oscillator): void {
    this.oscillator = oscillator;
    this.enableOscillator();
  }

  public getOscillator(): Oscillator {
    return this.oscillator;
  }

  public setStack(stack: Stack): void {
    this.stack = stack;
  }

  public getStack(): Stack {
    return this.stack;
  }

  public setMemory(memory: Memory): void {
    this.memory = memory;
  }

  public getMemory(): Memory {
    return this.memory;
  }

  public setDecoder(decoder: Decoder): void {
    this.decoder = decoder;
  }

  public getDecoder(): Decoder {
    return this.decoder;
  }

  public setPc(pc: number): void {
    this.context.pc = pc & Cpu.PROGRAM_COUNTER_MASK;
  }

  public setAc(ac: number): void {
    this.context.ac = ac;
  }

  public getPc(): number {
    return this.context.pc;
  }

  public getAc(): number {
    return this.context.ac;
  }

  private fetchNextOpcode(): Opcode {
    return this.readMemory(this.nextPc());
  }

  private decodeInstruction(opcode: Opcode): Instruction {
    return this.decoder.decode(opcode);
  }

  private executeInstruction(instruction: Instruction): void {
    instruction.execute(this);
    this.updateFlags();
    this.checkInterrupt();
  }

  private disableOscillator(): void {
    if (this.tickSub) {
      this.tickSub.unsubscribe();
    }
  }

  private enableOscillator(): void {
    this.disableOscillator();
    if (this.isRunning() && this.oscillator) {
      this.tickSub = this.oscillator.asObservable().subscribe(() => {
        this.tick();
      });
    }
  }

  private clearInterrupted(): void {
    this.interrupted = false;
  }

  private enableInterrupt(): void {
    this.interruptEnabled = true;
  }

  private disableInterrupt(): void {
    this.interruptEnabled = false;
  }

  private isRunning(): boolean {
    return !this.isSleeping() && this.isPowered();
  }
}
