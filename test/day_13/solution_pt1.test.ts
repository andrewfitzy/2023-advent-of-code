import {readFileAsStringArray} from '../test_utils/read_file';
import {
  solve,
  getHorizontalReflectionLine,
  getVerticalReflectionLine,
} from '../../src/day_13/solution_pt1';

describe('test getHorizontalReflectionLine', () => {
  test('example input expects 4', () => {
    const input: Array<string> = [
      '#...##..#',
      '#....#..#',
      '..##..###',
      '#####.##.',
      '#####.##.',
      '..##..###',
      '#....#..#',
    ];
    expect(getHorizontalReflectionLine(input)).toBe(4);
  });

  test('example input expects -1', () => {
    const input: Array<string> = [
      '#.##..##.',
      '..#.##.#.',
      '##......#',
      '##......#',
      '..#.##.#.',
      '..##..##.',
      '#.#.##.#.',
    ];
    expect(getHorizontalReflectionLine(input)).toBe(-1);
  });
});

describe('test getVerticalReflectionLine', () => {
  test('example input expects -1', () => {
    const input: Array<string> = [
      '#...##..#',
      '#....#..#',
      '..##..###',
      '#####.##.',
      '#####.##.',
      '..##..###',
      '#....#..#',
    ];
    expect(getVerticalReflectionLine(input)).toBe(-1);
  });

  test('example input expects 5', () => {
    const input: Array<string> = [
      '#.##..##.',
      '..#.##.#.',
      '##......#',
      '##......#',
      '..#.##.#.',
      '..##..##.',
      '#.#.##.#.',
    ];
    expect(getVerticalReflectionLine(input)).toBe(5);
  });
});

describe('test solve', () => {
  test('example input expects 405', () => {
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
    expect(solve(input)).toBe(405);
  });

  test('puzzle input expects 41859', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(41859);
  });
});
