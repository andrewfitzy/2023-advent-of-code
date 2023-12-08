import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_08/solution_pt2';

describe('test solve', () => {
  test('example input expects 2', () => {
    const input: Array<string> = [
      'LR',
      '',
      '11A = (11B, XXX)',
      '11B = (XXX, 11Z)',
      '11Z = (11B, XXX)',
      '22A = (22B, XXX)',
      '22B = (22C, 22C)',
      '22C = (22Z, 22Z)',
      '22Z = (22B, 22B)',
      'XXX = (XXX, XXX)',
    ];
    expect(solve(input)).toBe(6);
  });

  test('puzzle input expects 21083806112641', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(21083806112641);
  });
});
