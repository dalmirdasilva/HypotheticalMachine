/**
 * Instruction table
 *
 * 0x00 nop
 * 0x01 sta
 * 0x02 lda
 * 0x03 add
 * 0x04 or
 * 0x05 and
 * 0x06 not
 * 0x07 jmp
 * 0x08 jn
 * 0x09 jz
 *
 * 0x0a call
 * 0x0b ret
 * 0x0c push
 * 0x0d pop
 *
 * 0x0e reti
 *
 * 0xff hlt
 */
import {Cpu} from './cpu';

export type Opcode = number;

export enum MnemonicsOpcodes {
  NOP = 0x00,
  STA = 0x01,
  LDA = 0x02,
  ADD = 0x03,
  OR = 0x04,
  AND = 0x05,
  NOT = 0x06,
  JMP = 0x07,
  JN = 0x08,
  JZ = 0x09,
  CALL = 0x0a,
  RET = 0x0b,
  PUSH = 0x0c,
  POP = 0x0d,
  RETI = 0x0e,
  HLT = 0xff
}

export abstract class Instruction {

  protected constructor(private hasParameter: boolean) {
  }

  public static getOpcodes(): Array<Opcode> {
    return Object.values(MnemonicsOpcodes).filter((i: Opcode) => {
      return !isNaN(i);
    });
  }

  public static getMnemonics() {
    return Object.values(MnemonicsOpcodes).filter(isNaN).map((v: string) => v.toLowerCase());
  }

  public hasParam(): boolean {
    return this.hasParameter;
  }

  public abstract execute(cpu: Cpu): void;
}
