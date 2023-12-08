import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_06/solution_pt1';

describe('test solve', () => {
  test('example input expects 288', () => {
    const input: Array<string> = [
      'Time:      7  15   30',
      'Distance:  9  40  200',
    ];
    expect(solve(input)).toBe(288);
  });

  test('puzzle input expects 3316275', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(3316275);
  });
});
