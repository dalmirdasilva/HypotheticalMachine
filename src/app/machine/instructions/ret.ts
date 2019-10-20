import {Instruction} from '../instruction';
import {Cpu} from '../cpu';

export class Ret extends Instruction {

  public constructor() {
    super(false);
  }

  public execute(cpu: Cpu): void {
    cpu.setPc(cpu.stackPop());
  }
}
