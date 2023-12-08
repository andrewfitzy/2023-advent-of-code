import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_08/solution_pt1';

describe('test solve', () => {
  test('example input expects 2', () => {
    const input: Array<string> = [
      'RL',
      '',
      'AAA = (BBB, CCC)',
      'BBB = (DDD, EEE)',
      'CCC = (ZZZ, GGG)',
      'DDD = (DDD, DDD)',
      'EEE = (EEE, EEE)',
      'GGG = (GGG, GGG)',
      'ZZZ = (ZZZ, ZZZ)',
    ];
    expect(solve(input)).toBe(2);
  });

  test('example input expects 6', () => {
    const input: Array<string> = [
      'LLR',
      '',
      'AAA = (BBB, BBB)',
      'BBB = (AAA, ZZZ)',
      'ZZZ = (ZZZ, ZZZ)',
    ];
    expect(solve(input)).toBe(6);
  });
  test('puzzle input expects 21389', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(21389);
  });
});
