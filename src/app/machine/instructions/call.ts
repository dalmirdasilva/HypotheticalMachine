import {Instruction} from '../instruction';
import {Cpu} from '../cpu';

export class Call extends Instruction {

  public constructor() {
    super(true);
  }

  public execute(cpu: Cpu): void {
    const address = cpu.readMemory(cpu.nextPc());
    cpu.stackPush(cpu.getPc());
    cpu.setPc(address);
  }
}
