import {readFileAsStringArray} from '../test_utils/read_file';
import {solve, getPreviousNumber} from '../../src/day_09/solution_pt2';

describe('test getNextNumber', () => {
  test('"0 3 6 9 12 15" expects -3', () => {
    const input: number[] = [0, 3, 6, 9, 12, 15];
    expect(getPreviousNumber(input.reverse())).toBe(-3);
  });
  test('"1 3 6 10 15 21" expects 0', () => {
    const input: number[] = [1, 3, 6, 10, 15, 21];
    expect(getPreviousNumber(input.reverse())).toBe(0);
  });
  test('"10 13 16 21 30 45" expects 5', () => {
    const input: number[] = [10, 13, 16, 21, 30, 45];
    expect(getPreviousNumber(input.reverse())).toBe(5);
  });
});

describe('test solve', () => {
  test('example input expects 2', () => {
    const input: Array<string> = [
      '0 3 6 9 12 15',
      '1 3 6 10 15 21',
      '10 13 16 21 30 45',
    ];
    expect(solve(input)).toBe(2);
  });

  test('puzzle input expects 1068', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(1068);
  });
});
