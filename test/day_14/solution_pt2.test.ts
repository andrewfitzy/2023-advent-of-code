import {readFileAsStringArray} from '../test_utils/read_file';
import {solve, tiltCycle, sortLine} from '../../src/day_14/solution_pt2';

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

describe('test tiltCycle', () => {
  test('example after 1 cycle', () => {
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
    const expected: Array<string> = [
      '.....#....',
      '....#...O#',
      '...OO##...',
      '.OO#......',
      '.....OOO#.',
      '.O#...O#.#',
      '....O#....',
      '......OOOO',
      '#...O###..',
      '#..OO#....',
    ];
    const result = tiltCycle(input);
    expect(result.length).toBe(expected.length);
    for (let i = 0; i < expected.length; i++) {
      expect(result[i]).toBe(expected[i]);
    }
  });

  test('example after simulating second cycle', () => {
    const input: Array<string> = [
      '.....#....',
      '....#...O#',
      '...OO##...',
      '.OO#......',
      '.....OOO#.',
      '.O#...O#.#',
      '....O#....',
      '......OOOO',
      '#...O###..',
      '#..OO#....',
    ];
    const expected: Array<string> = [
      '.....#....',
      '....#...O#',
      '.....##...',
      '..O#......',
      '.....OOO#.',
      '.O#...O#.#',
      '....O#...O',
      '.......OOO',
      '#..OO###..',
      '#.OOO#...O',
    ];
    const result = tiltCycle(input);
    expect(result.length).toBe(expected.length);
    for (let i = 0; i < expected.length; i++) {
      expect(result[i]).toBe(expected[i]);
    }
  });

  test('example after simulating third cycle', () => {
    const input: Array<string> = [
      '.....#....',
      '....#...O#',
      '.....##...',
      '..O#......',
      '.....OOO#.',
      '.O#...O#.#',
      '....O#...O',
      '.......OOO',
      '#..OO###..',
      '#.OOO#...O',
    ];
    const expected: Array<string> = [
      '.....#....',
      '....#...O#',
      '.....##...',
      '..O#......',
      '.....OOO#.',
      '.O#...O#.#',
      '....O#...O',
      '.......OOO',
      '#...O###.O',
      '#.OOO#...O',
    ];
    const result = tiltCycle(input);
    expect(result.length).toBe(expected.length);
    for (let i = 0; i < expected.length; i++) {
      expect(result[i]).toBe(expected[i]);
    }
  });
});

describe('test solve', () => {
  test('example input expects 64', () => {
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
    expect(solve(input)).toBe(64);
  });

  test('puzzle input expects 91286', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(91286);
  });
});
