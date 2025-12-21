import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_12/solution_pt1';

describe('test solve', () => {
  test('example input 01 expects 21', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(21);
  });

  test('puzzle input expects 7674', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(7674);
  });
});
