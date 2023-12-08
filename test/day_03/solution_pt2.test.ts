import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_03/solution_pt2';

describe('test solve', () => {
  test('example input expects 140', () => {
    const input: Array<string> = [
      '2.3.......',
      '.*........',
      '..........',
      '.4*5......',
      '..........',
      '.6...8....',
      '.*....*...',
      '.7.....9..',
      '..........',
    ];
    expect(solve(input)).toBe(140);
  });

  test('example input expects 467835', () => {
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
    expect(solve(input)).toBe(467835);
  });

  test('puzzle input expects 78272573', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(78272573);
  });
});
