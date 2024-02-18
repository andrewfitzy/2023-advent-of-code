import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_11/solution_pt1';

describe('test solve', () => {
  test('example input expects 374', () => {
    const input: Array<string> = [
      '...#......',
      '.......#..',
      '#.........',
      '..........',
      '......#...',
      '.#........',
      '.........#',
      '..........',
      '.......#..',
      '#...#.....',
    ];
    expect(solve(input)).toBe(374);
  });

  xtest('puzzle input expects 9693756', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(9693756);
  });
});
