import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_07/solution_pt2';

describe('test solve', () => {
  test('example input expects 5905', () => {
    const input: Array<string> = [
      '32T3K 765',
      'T55J5 684',
      'KK677 28',
      'KTJJT 220',
      'QQQJA 483',
    ];
    expect(solve(input)).toBe(5905);
  });

  xtest('puzzle input expects 254412181', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(254412181);
  });
});
