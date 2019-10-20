import {Instruction} from '../instruction';
import {Cpu} from '../cpu';

export class Not extends Instruction {

  public constructor() {
    super(false);
  }

  public execute(cpu: Cpu): void {
    const ac = cpu.getAc();
    cpu.setAc(~ac);
  }
}
