import {readFileAsStringArray} from '../utils/read_file';
import {solve} from '../../src/day_05/solution_pt2';

describe('test solve', () => {
  test('example input expects 46', async () => {
    const fileInput = `${__dirname}/puzzle_example.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    const result = await solve(input);
    expect(result).toBe(46);
  });

  /*
   * ONLY ENABLE THIS TEST ONCE THE LOGIC IS FIXED, AT THE MOMENT THIS WILL RUN FOR MANY DAYS
   */
  xtest('puzzle input expects 0', async () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    const result = await solve(input);
    expect(result).toBe(0);
  });
});
