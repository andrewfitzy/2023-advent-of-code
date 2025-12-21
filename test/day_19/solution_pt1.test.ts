import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_19/solution_pt1';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input expects 19114', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(19114);
  });

  testSkipsCi('puzzle input expects 402185', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(402185);
  });
});
