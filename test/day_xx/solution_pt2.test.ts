import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_xx/solution_pt2';

describe('test solve', () => {
  test('example input expects 0', () => {
    const input: Array<string> = [];
    expect(solve(input)).toBe(0);
  });

  xtest('puzzle input expects something', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(0);
  });
});
