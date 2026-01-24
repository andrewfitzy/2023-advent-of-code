import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_24/solution_pt1';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input 01 expects 2', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(7, 27, input)).toBe(2);
  });

  testSkipsCi('puzzle input expects 11246', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(200000000000000, 400000000000000, input)).toBe(11246);
  });
});
