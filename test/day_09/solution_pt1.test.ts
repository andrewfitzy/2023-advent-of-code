import {readFileAsStringArray} from '../test_utils/read_file';
import {solve, getNextNumber} from '../../src/day_09/solution_pt1';

describe('test getNextNumber', () => {
  test('"0 3 6 9 12 15" expects 18', () => {
    const input: number[] = [0, 3, 6, 9, 12, 15];
    expect(getNextNumber(input)).toBe(18);
  });
  test('"1 3 6 10 15 21" expects 28', () => {
    const input: number[] = [1, 3, 6, 10, 15, 21];
    expect(getNextNumber(input)).toBe(28);
  });
  test('"10 13 16 21 30 45" expects 68', () => {
    const input: number[] = [10, 13, 16, 21, 30, 45];
    expect(getNextNumber(input)).toBe(68);
  });
});

describe('test solve', () => {
  test('example input expects 114', () => {
    const input: Array<string> = [
      '0 3 6 9 12 15',
      '1 3 6 10 15 21',
      '10 13 16 21 30 45',
    ];
    expect(solve(input)).toBe(114);
  });

  xtest('puzzle input expects 1969958987', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(1969958987);
  });
});
