import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_10/solution_pt2';

describe('test solve', () => {
  test('example input expects 4', () => {
    const input: Array<string> = [
      '...........',
      '.S-------7.',
      '.|F-----7|.',
      '.||.....||.',
      '.||.....||.',
      '.|L-7.F-J|.',
      '.|..|.|..|.',
      '.L--J.L--J.',
      '...........',
    ];
    expect(solve(input)).toBe(4);
  });

  test('puzzle input expects 325', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(325);
  });
});
