import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_16/solution_pt1';

describe('test solve', () => {
  test('example input expects 46', () => {
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
    expect(solve(input)).toBe(46);
  });

  xtest('puzzle input expects 7236', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(7236);
  });
});
