import {gcd, lcm, rotateStringList, Direction} from '../../src/utils/util';

describe('test lcm', () => {
  test('12,15 expects 60', () => {
    const n1 = 12;
    const n2 = 15;
    expect(lcm(n1, n2)).toBe(60);
  });
});

describe('test gcd', () => {
  test('12,15 expects 0', () => {
    const n1 = 12;
    const n2 = 15;
    expect(gcd(n1, n2)).toBe(3);
  });
});

describe('test rotateStringList', () => {
  test('test rotating LEFT', () => {
    const input: Array<string> = ['abc', 'def', 'ghi'];
    const expected: Array<string> = ['cfi', 'beh', 'adg'];
    const result = rotateStringList(input, Direction.LEFT);
    expect(result.length).toBe(3);
    expect(result[0]).toBe(expected[0]);
    expect(result[1]).toBe(expected[1]);
    expect(result[2]).toBe(expected[2]);
  });
  test('test rotating RIGHT', () => {
    const input: Array<string> = ['abc', 'def', 'ghi'];
    const expected: Array<string> = ['gda', 'heb', 'ifc'];
    const result = rotateStringList(input, Direction.RIGHT);
    expect(result.length).toBe(3);
    expect(result[0]).toBe(expected[0]);
    expect(result[1]).toBe(expected[1]);
    expect(result[2]).toBe(expected[2]);
  });
});
