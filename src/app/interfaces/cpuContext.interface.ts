export interface CpuContextInterface {
  pc: number;
  ac: number;
  flags: CpuContextFlags;
}

export interface CpuContextFlags {
  z: boolean;
  n: boolean;
}

export function emptyContext(): CpuContextInterface {
  return {
    pc: 0,
    ac: 0,
    flags: {
      n: false,
      z: false
    }
  };
}

export function cloneCpuContext(context: CpuContextInterface): CpuContextInterface {
  return {
    pc: context.pc,
    ac: context.ac,
    flags: {
      n: context.flags.n,
      z: context.flags.z
    }
  };
}

export function resetCpuContext(context: CpuContextInterface): void {
  context.pc = 0;
  context.ac = 0;
  context.flags.z = false;
  context.flags.n = false;
}
