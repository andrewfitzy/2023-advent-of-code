import {readFileAsStringArray} from '../utils/read_file';
import {
  solve,
  isValidGame,
  extractGameNumber,
} from '../../src/day_02/solution_pt1';

describe('test extractGameNumber', () => {
  test('Game 1 is game 1', () => {
    expect(extractGameNumber('Game 1')).toBe(1);
  });
});

describe('test isValidGame', () => {
  test('3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green is valid', () => {
    expect(isValidGame('3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toBe(
      true
    );
  });

  test('"1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue is valid', () => {
    expect(
      isValidGame('1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue')
    ).toBe(true);
  });

  test('"8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red is invalid', () => {
    expect(
      isValidGame(
        '8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'
      )
    ).toBe(false);
  });

  test('"1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red is invalid', () => {
    expect(
      isValidGame(
        '1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'
      )
    ).toBe(false);
  });

  test('"6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green, 1 blue is valid', () => {
    expect(isValidGame('6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green')).toBe(
      true
    );
  });
});

describe('test solve', () => {
  test('example input expects 8', () => {
    const input: Array<string> = [
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
    ];
    expect(solve(input)).toBe(8);
  });

  test('puzzle input expects 3059', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(3059);
  });
});
