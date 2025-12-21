import {readFileAsStringArray} from '../test_utils/read_file';
import {solve, getCardMatches} from '../../src/day_04/solution_pt1';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('puzzle input expects something', () => {
    const input = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53';
    const result = getCardMatches(input);
    expect(result.length).toBe(4);
  });

  test('puzzle input expects something', () => {
    const input = 'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19';
    const result = getCardMatches(input);
    expect(result.length).toBe(2);
  });

  test('puzzle input expects something', () => {
    const input = 'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1';
    const result = getCardMatches(input);
    expect(result.length).toBe(2);
  });

  test('puzzle input expects something', () => {
    const input = 'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83';
    const result = getCardMatches(input);
    expect(result.length).toBe(1);
  });

  test('puzzle input expects something', () => {
    const input = 'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36';
    const result = getCardMatches(input);
    expect(result.length).toBe(0);
  });

  test('puzzle input expects something', () => {
    const input = 'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11';
    const result = getCardMatches(input);
    expect(result.length).toBe(0);
  });

  test('puzzle input expects something', () => {
    const input =
      'Card 200: 85 88  3 44 54 19  9 71 29 53 | 72 42 56 55 33 68 65 86 58  3 57 83 12 31 96  9 13 62 70 80 17 29 41 27  6';
    const result = getCardMatches(input);
    expect(result.length).toBe(3);
  });
});

describe('test solve', () => {
  test('example input expects 13', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(13);
  });

  testSkipsCi('puzzle input expects 25651', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(25651);
  });
});
