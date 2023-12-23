import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_13/solution_pt2';

describe('test solve', () => {
  test('example input expects 400', () => {
    const input: Array<string> = [
      '#.##..##.',
      '..#.##.#.',
      '##......#',
      '##......#',
      '..#.##.#.',
      '..##..##.',
      '#.#.##.#.',
      '',
      '#...##..#',
      '#....#..#',
      '..##..###',
      '#####.##.',
      '#####.##.',
      '..##..###',
      '#....#..#',
    ];
    expect(solve(input)).toBe(400);
  });

  test('puzzle input expects 30842', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(30842);
  });
});
