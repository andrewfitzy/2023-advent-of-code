import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_20/solution_pt2';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test solve', () => {
  test('example input 02 expects 1', () => {
    const fileInput = `${__dirname}/example_input_02.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve('output', input)).toBe(1);
  });

  testSkipsCi('puzzle input expects 247023644760071', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve('rx', input)).toBe(247023644760071);
  });
});
