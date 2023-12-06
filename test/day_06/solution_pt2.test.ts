import {readFileAsStringArray} from '../utils/read_file';
import {solve} from '../../src/day_06/solution_pt2';

describe('test solve', () => {
  test('example input expects 71503', () => {
    const input: Array<string> = [
      'Time:      7  15   30',
      'Distance:  9  40  200',
    ];
    expect(solve(input)).toBe(71503);
  });

  test('puzzle input expects 27102791', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(27102791);
  });
});
