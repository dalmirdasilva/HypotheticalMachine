import {Injectable} from '@angular/core';
import {Instruction, MnemonicsOpcodes, Opcode} from './instruction';
import {Nop} from './instructions/nop';
import {Sta} from './instructions/sta';
import {Lda} from './instructions/lda';
import {Add} from './instructions/add';
import {Or} from './instructions/or';
import {And} from './instructions/and';
import {Not} from './instructions/not';
import {Jmp} from './instructions/jmp';
import {Jn} from './instructions/jn';
import {Jz} from './instructions/jz';
import {Call} from './instructions/call';
import {Ret} from './instructions/ret';
import {Push} from './instructions/push';
import {Pop} from './instructions/pop';
import {Reti} from './instructions/reti';
import {Hlt} from './instructions/hlt';

@Injectable({
  providedIn: 'root'
})
export class Decoder {

  constructor() {
  }

  public decode(opcode: Opcode): Instruction {
    switch (opcode) {
      case MnemonicsOpcodes.NOP:
        return new Nop();
      case MnemonicsOpcodes.STA:
        return new Sta();
      case MnemonicsOpcodes.LDA:
        return new Lda();
      case MnemonicsOpcodes.ADD:
        return new Add();
      case MnemonicsOpcodes.OR:
        return new Or();
      case MnemonicsOpcodes.AND:
        return new And();
      case MnemonicsOpcodes.NOT:
        return new Not();
      case MnemonicsOpcodes.JMP:
        return new Jmp();
      case MnemonicsOpcodes.JN:
        return new Jn();
      case MnemonicsOpcodes.JZ:
        return new Jz();
      case MnemonicsOpcodes.CALL:
        return new Call();
      case MnemonicsOpcodes.RET:
        return new Ret();
      case MnemonicsOpcodes.PUSH:
        return new Push();
      case MnemonicsOpcodes.POP:
        return new Pop();
      case MnemonicsOpcodes.RETI:
        return new Reti();
      case MnemonicsOpcodes.HLT:
        return new Hlt();
      default:
        return new Nop();
    }
  }
}
