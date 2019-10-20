/**
 * SeekableArray class
 */
export class SeekableArray<T> {

  public static GROW_MIN_CHUNK = 10;
  private pos: number;
  private buf: Array<T>;

  public constructor() {
    this.buf = new Array<T>(SeekableArray.GROW_MIN_CHUNK);
    this.pos = 0;
  }

  public push(e: T): void {
    const free = this.getFreeRoom();
    if (free <= 0) {
      this.grow(1);
    }
    this.buf[this.pos++] = e;
  }

  public pop(): T {
    if (this.pos <= 0) {
      throw new Error('SeekableArray underflow.');
    }
    return this.buf[--this.pos];
  }

  public seek(position: number): void {
    if (position >= this.buf.length) {
      const need = position - this.buf.length;
      this.grow(need + 1);
    }
    this.pos = position;
  }

  public getBuffer(): Array<T> {
    return this.buf;
  }

  public getPosition(): number {
    return this.pos;
  }

  private grow(by: number): void {
    this.buf = [...this.buf, ...Array<T>(Math.max(by, SeekableArray.GROW_MIN_CHUNK))];
  }

  private getFreeRoom(): number {
    return this.buf.length - this.pos;
  }
}
