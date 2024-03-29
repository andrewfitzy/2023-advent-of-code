import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_03/solution_pt1';

describe('test solve', () => {
  test('example input expects 4361', () => {
    const input: Array<string> = [
      '467..114..',
      '...*......',
      '..35..633.',
      '......#...',
      '617*......',
      '.....+.58.',
      '..592.....',
      '......755.',
      '...$.*....',
      '.664.598..',
    ];
    expect(solve(input)).toBe(4361);
  });

  xtest('puzzle input expects 536202', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(536202);
  });
});
