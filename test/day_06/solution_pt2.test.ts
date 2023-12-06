import {readFileAsStringArray} from '../utils/read_file';
import {solve} from '../../src/day_06/solution_pt2';

describe('test solve', () => {
  test('puzzle input expects something', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(0);
  });
});
