import {Instruction} from '../instruction';
import {Cpu} from '../cpu';

export class Pop extends Instruction {

  public constructor() {
    super(false);
  }

  public execute(cpu: Cpu): void {
    const value = cpu.stackPop();
    cpu.setAc(value);
  }
}
