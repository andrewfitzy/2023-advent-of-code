import {readFileAsStringArray} from '../test_utils/read_file';
import {solve, hashValue} from '../../src/day_15/solution_pt1';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test hashValue with HASH', () => {
  test('HASH expects 52', () => {
    expect(hashValue('HASH')).toBe(52);
  });
  test('rn=1 expects 30', () => {
    expect(hashValue('rn=1')).toBe(30);
  });
});

describe('test solve', () => {
  test('example input expects 1320', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(1320);
  });

  testSkipsCi('puzzle input expects 514025', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(514025);
  });
});
