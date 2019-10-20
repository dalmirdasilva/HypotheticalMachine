import {Instruction} from '../instruction';
import {Cpu} from '../cpu';

export class Push extends Instruction {

  public constructor() {
    super(false);
  }

  public execute(cpu: Cpu): void {
    const value = cpu.getAc();
    cpu.stackPush(value);
  }
}
