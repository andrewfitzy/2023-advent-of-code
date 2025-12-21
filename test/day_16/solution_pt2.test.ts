import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_16/solution_pt2';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input expects 51', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(51);
  });

  testSkipsCi('puzzle input expects 7521', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(7521);
  });
});
