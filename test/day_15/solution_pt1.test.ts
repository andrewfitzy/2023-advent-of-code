import {readFileAsStringArray} from '../test_utils/read_file';
import {solve, hashValue} from '../../src/day_15/solution_pt1';

describe('test hashValue with HASH', () => {
  test('HASH expects 52', () => {
    expect(hashValue('HASH')).toBe(52);
  });
  test('rn=1 expects 30', () => {
    expect(hashValue('rn=1')).toBe(30);
  });
});

describe('test solve', () => {
  test('example input expects 1320', () => {
    const input: Array<string> = [
      'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7',
    ];
    expect(solve(input)).toBe(1320);
  });

  xtest('puzzle input expects something', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(514025);
  });
});
