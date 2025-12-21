import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_06/solution_pt1';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input expects 288', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(288);
  });

  testSkipsCi('puzzle input expects 3316275', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(3316275);
  });
});
