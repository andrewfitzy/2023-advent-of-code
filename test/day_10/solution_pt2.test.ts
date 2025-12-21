import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_10/solution_pt2';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input expects 4', () => {
    const fileInput = `${__dirname}/example_input_03.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(4);
  });

  test('example input expects 8', () => {
    const fileInput = `${__dirname}/example_input_04.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(8);
  });

  test('example input expects 10', () => {
    const fileInput = `${__dirname}/example_input_05.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(10);
  });

  testSkipsCi('puzzle input expects 325', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(325);
  });
});
