import {Inject, Injectable, InjectionToken} from '@angular/core';

export const STACK_SIZE_TOKEN = new InjectionToken<number>('Stack size.');

@Injectable({
  providedIn: 'root'
})
export class Stack {

  private readonly buffer: Int8Array;
  private tos: number;

  constructor(@Inject(STACK_SIZE_TOKEN) private size: number) {
    this.buffer = new Int8Array(size);
    this.tos = 0;
  }

  public push(value: number): void {
    if (this.tos >= this.size) {
      throw new Error('Stack overflow.');
    }
    this.buffer[this.tos++] = value;
  }

  public pop(): number {
    if (this.tos <= 0) {
      throw new Error('Stack underflow.');
    }
    return this.buffer[--this.tos];
  }

  public getTop(): number {
    return this.tos;
  }

  public getSize(): number {
    return this.size;
  }

  public getBuffer(): Int8Array {
    return this.buffer;
  }

  public erase(): void {
    this.getBuffer().set(new Uint8Array(this.size), 0);
    this.tos = 0;
  }
}
