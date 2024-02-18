import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_05/solution_pt2';

describe('test solve', () => {
  test('example input expects 46', async () => {
    const fileInput = `${__dirname}/puzzle_example.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    const result = await solve(input);
    expect(result).toBe(46);
  });

  xtest('puzzle input expects 24261545', async () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    const result = await solve(input);
    expect(result).toBe(24261545);
  });
});
