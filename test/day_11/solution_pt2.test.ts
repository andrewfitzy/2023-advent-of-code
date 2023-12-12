import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_11/solution_pt2';

describe('test solve', () => {
  test('example input expects 82000210', () => {
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
    expect(solve(input)).toBe(82000210);
  });

  test('puzzle input expects 717878258016', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(717878258016);
  });
});
