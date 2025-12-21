import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_11/solution_pt1';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input expects 374', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(374);
  });

  testSkipsCi('puzzle input expects 9693756', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(9693756);
  });
});
