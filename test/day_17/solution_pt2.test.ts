import {readFileAsStringArray} from '../test_utils/read_file';
import {solve} from '../../src/day_17/solution_pt2';

describe('test solve', () => {
  xtest('example input expects 0', () => {
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
    expect(solve(input)).toBe(0);
  });

  xtest('puzzle input expects something', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(0);
  });
});
