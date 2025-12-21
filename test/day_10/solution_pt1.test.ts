import {readFileAsStringArray} from '../test_utils/read_file';
import {
  solve,
  getNextLocation,
  Coordinate,
} from '../../src/day_10/solution_pt1';
import {testSkipsCi} from '../test_utils/skip_ci';

describe('test getNextLocation', () => {
  describe('test |', () => {
    test('going from bottom to top', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(2, 1);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', '|', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(0);
      expect(result.column).toBe(1);
    });
    test('going from top to bottom', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(0, 1);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', '|', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(2);
      expect(result.column).toBe(1);
    });
  });
  describe('test -', () => {
    test('going from left to right', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(1, 0);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', '-', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(1);
      expect(result.column).toBe(2);
    });
    test('going from right to left', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(1, 2);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', '-', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(1);
      expect(result.column).toBe(0);
    });
  });
  describe('test L', () => {
    test('going from top to right', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(0, 1);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', 'L', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(1);
      expect(result.column).toBe(2);
    });
    test('going from right to top', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(1, 2);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', 'L', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(0);
      expect(result.column).toBe(1);
    });
  });
  describe('test J', () => {
    test('going from top to left', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(0, 1);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', 'J', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(1);
      expect(result.column).toBe(0);
    });
    test('going from left to top', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(1, 0);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', 'J', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(0);
      expect(result.column).toBe(1);
    });
  });
  describe('test 7', () => {
    test('going from left to bottomm', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(1, 0);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', '7', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(2);
      expect(result.column).toBe(1);
    });
    test('going from bottom to left', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(2, 1);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', '7', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(1);
      expect(result.column).toBe(0);
    });
  });
  describe('test F', () => {
    test('going from right to bottomm', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(1, 2);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', 'F', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(2);
      expect(result.column).toBe(1);
    });
    test('going from bottom to right', () => {
      const currentLocation: Coordinate = new Coordinate(1, 1);
      const previousLocation: Coordinate = new Coordinate(2, 1);
      const input: string[][] = [
        ['.', '.', '.'],
        ['.', 'F', '.'],
        ['.', '.', '.'],
      ];
      const result = getNextLocation(currentLocation, previousLocation, input);
      expect(result.row).toBe(1);
      expect(result.column).toBe(2);
    });
  });
});

describe('test solve', () => {
  test('example input expects 4', () => {
    const fileInput = `${__dirname}/example_input_01.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(4);
  });

  test('example input expects 8', () => {
    const fileInput = `${__dirname}/example_input_02.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(8);
  });

  testSkipsCi('puzzle input expects 6846', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(6846);
  });
});
