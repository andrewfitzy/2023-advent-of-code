import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_03/solution_pt2';
import {testSkipsCi} from '../test_utils/skip_ci';

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
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(467835);
  });

  testSkipsCi('puzzle input expects 78272573', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(78272573);
  });
});
