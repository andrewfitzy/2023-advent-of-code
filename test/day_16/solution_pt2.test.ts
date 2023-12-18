import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_16/solution_pt2';

describe('test solve', () => {
  test('example input expects 51', () => {
    const input: Array<string> = [
      '.|...\\....',
      '|.-.\\.....',
      '.....|-...',
      '........|.',
      '..........',
      '.........\\',
      '..../.\\\\..',
      '.-.-/..|..',
      '.|....-|.\\',
      '..//.|....',
    ];
    expect(solve(input)).toBe(51);
  });

  test('puzzle input expects 7521', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(7521);
  });
});
