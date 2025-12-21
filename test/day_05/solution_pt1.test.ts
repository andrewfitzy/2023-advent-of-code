import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_05/solution_pt1';

describe('test solve', () => {
  test('example input expects 35', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(35);
  });

  xtest('puzzle input expects 261668924', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(261668924);
  });
});
