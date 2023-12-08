import {readFileAsStringArray} from '../test_utils/read_file';
import {solve, extractNumber} from '../../src/day_01/solution_pt1';

describe('test extractNumber', () => {
  test('1abc2 expects 12', () => {
    expect(extractNumber('1abc2')).toBe(12);
  });

  test('pqr3stu8vwx expects 38', () => {
    expect(extractNumber('pqr3stu8vwx')).toBe(38);
  });

  test('a1b2c3d4e5f expects 15', () => {
    expect(extractNumber('a1b2c3d4e5f')).toBe(15);
  });

  test('treb7uchet expects 77', () => {
    expect(extractNumber('treb7uchet')).toBe(77);
  });
});

describe('test solve', () => {
  test('example input expects 142', () => {
    const input: Array<string> = [
      '1abc2',
      'pqr3stu8vwx',
      'a1b2c3d4e5f',
      'treb7uchet',
    ];
    expect(solve(input)).toBe(142);
  });

  test('puzzle input expects 55090', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(55090);
  });
});
