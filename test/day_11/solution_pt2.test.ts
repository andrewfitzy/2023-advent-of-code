import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_11/solution_pt2';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input expects 82000210', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(82000210);
  });

  testSkipsCi('puzzle input expects 717878258016', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(717878258016);
  });
});
