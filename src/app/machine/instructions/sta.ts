import {Instruction} from '../instruction';
import {Cpu} from '../cpu';

export class Sta extends Instruction {

  public constructor() {
    super(true);
  }

  public execute(cpu: Cpu): void {
    const address = cpu.readMemory(cpu.nextPc());
    cpu.writeMemory(address, cpu.getAc());
  }
}
