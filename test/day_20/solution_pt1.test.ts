import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_20/solution_pt1';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input 01 expects 32000000', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(1000, input)).toBe(32000000);
  });

  test('example input 02 expects 11687500', () => {
    const fileInput = `${__dirname}/example_input_02.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(1000, input)).toBe(11687500);
  });

  testSkipsCi('puzzle input expects 861743850', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(1000, input)).toBe(861743850);
  });
});
