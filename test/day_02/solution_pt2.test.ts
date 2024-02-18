import {readFileAsStringArray} from '../test_utils/read_file';
import {solve, getGamePower} from '../../src/day_02/solution_pt2';

describe('test isValidGame', () => {
  test('3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green is valid', () => {
    expect(getGamePower('3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toBe(
      48
    );
  });

  test('"1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue is valid', () => {
    expect(
      getGamePower('1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue')
    ).toBe(12);
  });

  test('"8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red is invalid', () => {
    expect(
      getGamePower(
        '8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'
      )
    ).toBe(1560);
  });

  test('"1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red is invalid', () => {
    expect(
      getGamePower(
        '1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'
      )
    ).toBe(630);
  });

  test('"6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green, 1 blue is valid', () => {
    expect(getGamePower('6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green')).toBe(
      36
    );
  });
});

describe('test solve', () => {
  test('example input expects 2286', () => {
    const input: Array<string> = [
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
    ];
    expect(solve(input)).toBe(2286);
  });

  xtest('puzzle input expects 65371', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(65371);
  });
});
