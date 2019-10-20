import {Instruction} from '../instruction';
import {Cpu} from '../cpu';

export class Jz extends Instruction {

  public constructor() {
    super(true);
  }

  public execute(cpu: Cpu): void {
    const to = cpu.readMemory(cpu.nextPc());
    if (cpu.getFlags().z) {
      cpu.setPc(to);
    }
  }
}
