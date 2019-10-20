import {Instruction} from '../instruction';
import {Cpu} from '../cpu';

export class Hlt extends Instruction {

  public constructor() {
    super(false);
  }

  public execute(cpu: Cpu): void {
    cpu.sleep();
  }
}
