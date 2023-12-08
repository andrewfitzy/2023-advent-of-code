import {readFileAsStringArray} from '../utils/read_file';
import {solve} from '../../src/day_08/solution_pt2';

describe('test solve', () => {
  xtest('puzzle input expects something', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(0);
  });
});
