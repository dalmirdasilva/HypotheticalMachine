import {Inject, Injectable, InjectionToken} from '@angular/core';
import {MemoryAccessInterface} from '../interfaces/memoryAccess.interface';

export const MEMORY_SIZE_TOKEN = new InjectionToken<number>('Memory size.');

@Injectable({
  providedIn: 'root'
})
export class Memory {

  private readonly access: MemoryAccessInterface;
  private buffer: Int8Array;

  public constructor(@Inject(MEMORY_SIZE_TOKEN) private size: number) {
    this.buffer = new Int8Array(size);
    this.access = {read: 0, write: 0};


// 07
// 09

// 2	00// 3	00
// 4	02	lda (f2)
// 5	f2
// 6	01	sta (fc)
// 7	fc
// 8	0e	reti
// 9	02	lda (fc)
// a	fc
// b	03	add (f0)
// c	f0
// d	01	sta (fc)
// e	fc
// f	09	jz (13)
// 10	13
// 11	07	jmp (9)
// 12	09
// 13	ff

  }

  public read(address: number): number {
    this.checkBoundaries(address);
    this.access.read++;
    return this.buffer[address];
  }

  public write(address: number, value: number) {
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
