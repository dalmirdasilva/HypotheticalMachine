import {Instruction} from '../instruction';
import {Cpu} from '../cpu';

export class Jmp extends Instruction {

  public constructor() {
    super(true);
  }

  public execute(cpu: Cpu): void {
    const to = cpu.readMemory(cpu.nextPc());
    cpu.setPc(to);
  }
}
