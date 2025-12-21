import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_08/solution_pt2';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input expects 2', () => {
    const fileInput = `${__dirname}/example_input_03.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(6);
  });

  testSkipsCi('puzzle input expects 21083806112641', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(21083806112641);
  });
});
