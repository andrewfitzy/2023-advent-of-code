import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_17/solution_pt2';

describe('test solve', () => {
  test('example input expects 94', () => {
    const input: Array<string> = [
      '2413432311323',
      '3215453535623',
      '3255245654254',
      '3446585845452',
      '4546657867536',
      '1438598798454',
      '4457876987766',
      '3637877979653',
      '4654967986887',
      '4564679986453',
      '1224686865563',
      '2546548887735',
      '4322674655533',
    ];
    expect(solve(input)).toBe(94);
  });

  test('example input expects 71', () => {
    const input: Array<string> = [
      '111111111111',
      '999999999991',
      '999999999991',
      '999999999991',
      '999999999991',
    ];
    expect(solve(input)).toBe(71);
  });

  test('puzzle input expects 1416', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(1416);
  });
});
