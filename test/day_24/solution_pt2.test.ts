import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_24/solution_pt2';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input 01 expects 47', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(47);
  });

  testSkipsCi('puzzle input expects 716599937560103', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(716599937560103);
  });
});
