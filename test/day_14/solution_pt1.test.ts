import {readFileAsStringArray} from '../test_utils/read_file';
import {solve, sortLine} from '../../src/day_14/solution_pt1';

describe('test sortLine', () => {
  test('should sort O....#....', () => {
    expect(sortLine('O....#....')).toBe('O....#....');
  });

  test('should sort O.OO#....#', () => {
    expect(sortLine('O.OO#....#')).toBe('OOO.#....#');
  });

  test('should sort .....##...', () => {
    expect(sortLine('.....##...')).toBe('.....##...');
  });

  test('should sort OO.#O....O', () => {
    expect(sortLine('OO.#O....O')).toBe('OO.#OO....');
  });

  test('should sort .O.....O#.', () => {
    expect(sortLine('.O.....O#.')).toBe('OO......#.');
  });

  test('should sort O.#..O.#.#', () => {
    expect(sortLine('O.#..O.#.#')).toBe('O.#O...#.#');
  });

  test('should sort ..O..#O..O', () => {
    expect(sortLine('..O..#O..O')).toBe('O....#OO..');
  });

  test('should sort .......O..', () => {
    expect(sortLine('.......O..')).toBe('O.........');
  });

  test('should sort #....###..', () => {
    expect(sortLine('#....###..')).toBe('#....###..');
  });

  test('should sort #OO..#....', () => {
    expect(sortLine('#OO..#....')).toBe('#OO..#....');
  });
});

describe('test solve', () => {
  test('example input expects 136', () => {
    const input: Array<string> = [
      'O....#....',
      'O.OO#....#',
      '.....##...',
      'OO.#O....O',
      '.O.....O#.',
      'O.#..O.#.#',
      '..O..#O..O',
      '.......O..',
      '#....###..',
      '#OO..#....',
    ];
    expect(solve(input)).toBe(136);
  });

  test('puzzle input expects 105784', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(105784);
  });
});
