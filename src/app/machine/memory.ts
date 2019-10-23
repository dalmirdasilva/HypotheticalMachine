import {Inject, Injectable, InjectionToken} from '@angular/core';
import {MemoryAccessInterface} from '../interfaces/memoryAccess.interface';

export const MEMORY_SIZE_TOKEN = new InjectionToken<number>('Memory size.');

@Injectable({
  providedIn: 'root'
})
export class Memory {

  private static MEMORY_MASK = 0xff;
  private readonly access: MemoryAccessInterface;
  private buffer: Int8Array;

  public constructor(@Inject(MEMORY_SIZE_TOKEN) private size: number) {
    this.buffer = new Int8Array(size);
    this.access = {read: 0, write: 0};
  }

  public read(address: number): number {
    address &= Memory.MEMORY_MASK;
    this.checkBoundaries(address);
    this.access.read++;
    return this.buffer[address];
  }

  public write(address: number, value: number) {
    address &= Memory.MEMORY_MASK;
    value &= Memory.MEMORY_MASK;
    this.checkBoundaries(address);
    this.buffer[address] = value;
    this.access.write++;
  }

  public erase(): void {
    this.buffer.set(new Int8Array(this.size), 0);
    this.resetAccess();
  }

  public resetAccess(): void {
    this.access.read = 0;
    this.access.write = 0;
  }

  public getAccess(): MemoryAccessInterface {
    return this.access;
  }

  public getSize(): number {
    return this.size;
  }

  public getBuffer(): Int8Array {
    return this.buffer;
  }

  public setBuffer(buffer: Int8Array): void {
    this.buffer = new Int8Array(buffer);
  }

  private checkBoundaries(address) {
    if (address < 0 || address >= this.size) {
      throw new Error('Memory access violation at ' + address + '.');
    }
  }
}
