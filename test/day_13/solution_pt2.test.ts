import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_13/solution_pt2';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input expects 400', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(400);
  });

  testSkipsCi('puzzle input expects 30842', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(30842);
  });
});
