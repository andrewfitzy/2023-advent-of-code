import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_19/solution_pt2';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input expects 167409079868000', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(167409079868000);
  });

  testSkipsCi('puzzle input expects 130291480568730', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(130291480568730);
  });
});
