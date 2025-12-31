import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_21/solution_pt1';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input 01 expects 16', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input, 6)).toBe(16);
  });

  testSkipsCi('puzzle input expects 3768', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input, 64)).toBe(3768);
  });
});
