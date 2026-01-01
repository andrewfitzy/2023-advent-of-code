import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_12/solution_pt2';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input 01 expects 525152', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(525152);
  });

  testSkipsCi('puzzle input expects 4443895258186', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(4443895258186);
  });
});
