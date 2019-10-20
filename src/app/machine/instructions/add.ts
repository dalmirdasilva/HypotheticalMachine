import {Instruction} from '../instruction';
import {Cpu} from '../cpu';

export class Add extends Instruction {

  public constructor() {
    super(true);
  }

  public execute(cpu: Cpu): void {
    const address = cpu.readMemory(cpu.nextPc());
    const value = cpu.readMemory(address);
    const ac = cpu.getAc();
    cpu.setAc(ac + value);
  }
}
