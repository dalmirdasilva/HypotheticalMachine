import {SeekableArray} from './seekableArray';

describe('SeekableArray', () => {

  let seekableArray: SeekableArray<string | number>;
  const stringValue = 'string value';
  const numberValue = 42;

  beforeEach((() => {
    seekableArray = new SeekableArray<string | number>();
  }));

  describe('push', () => {

    it('should store values at right positions', () => {
      const value0 = `${stringValue}0`;
      const value1 = `${stringValue}1`;
      const prevPos = seekableArray.getPosition();
      seekableArray.push(value0);
      seekableArray.push(value1);
      const currPos = seekableArray.getPosition();
      const buff = seekableArray.getBuffer();
      expect(currPos - prevPos).toBe(2);
      expect(buff[prevPos]).toBe(value0);
      expect(buff[prevPos + 1]).toBe(value1);
    });

    it('should grow as needed by GROW_MIN_CHUNK increments', () => {
      expect(seekableArray.getBuffer().length).toEqual(SeekableArray.GROW_MIN_CHUNK);
      for (let i = 0; i < 1.5 * SeekableArray.GROW_MIN_CHUNK; i++) {
        seekableArray.push(i % 2 === 0 ? numberValue : stringValue);
      }
      expect(seekableArray.getBuffer().length).toEqual(2 * SeekableArray.GROW_MIN_CHUNK);
    });
  });

  describe('pop', () => {

    it('should raise exception when underflow', () => {
      expect(() => {
        seekableArray.pop();
      }).toThrow(new Error('SeekableArray underflow.'));
    });

    it('should return element at the current position', () => {
      seekableArray.push(stringValue);
      const pos = seekableArray.getPosition();
      seekableArray.push(numberValue);
      expect(seekableArray.pop()).toBe(numberValue);
      expect(seekableArray.getPosition()).toBe(pos);
    });
  });

  describe('seek', () => {

    it('should move position correctly', () => {
      seekableArray.seek(2 * SeekableArray.GROW_MIN_CHUNK);
      expect(seekableArray.getPosition()).toBe(2 * SeekableArray.GROW_MIN_CHUNK);
      seekableArray.seek(3 * SeekableArray.GROW_MIN_CHUNK);
      expect(seekableArray.getPosition()).toBe(3 * SeekableArray.GROW_MIN_CHUNK);
      seekableArray.seek(0);
      expect(seekableArray.getPosition()).toBe(0);
    });
  });
});
