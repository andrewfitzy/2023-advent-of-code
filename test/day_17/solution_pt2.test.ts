import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_17/solution_pt2';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input expects 94', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(94);
  });

  test('example input expects 71', () => {
    const fileInput = `${__dirname}/example_input_02.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(71);
  });

  testSkipsCi('puzzle input expects 1416', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(1416);
  });
});
