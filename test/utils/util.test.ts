import {gcd, lcm} from '../../src/utils/util';

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
