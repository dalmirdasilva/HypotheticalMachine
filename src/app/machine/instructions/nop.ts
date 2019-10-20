import {Instruction} from '../instruction';
import {Cpu} from '../cpu';

export class Nop extends Instruction {

  public constructor() {
    super(false);
  }

  public execute(_: Cpu): void {
  }
}
