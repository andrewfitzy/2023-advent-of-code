import {readFileAsStringArray} from '../test_utils/read_file';
import {solve, hashValue, boxPower, Lens} from '../../src/day_15/solution_pt2';

describe('test hashValue', () => {
  test('HASH expects 52', () => {
    expect(hashValue('HASH')).toBe(52);
  });
  test('rn=1 expects 30', () => {
    expect(hashValue('rn=1')).toBe(30);
  });
});

describe('test lensPower', () => {
  test('boxPower expects 5', () => {
    const boxNumber = 0;
    const box = [new Lens('rn', 1), new Lens('rn', 2)];
    expect(boxPower(boxNumber, box)).toBe(5);
  });
  test('boxPower expects 140', () => {
    const boxNumber = 3;
    const box = [new Lens('ot', 7), new Lens('ab', 5), new Lens('pc', 6)];
    expect(boxPower(boxNumber, box)).toBe(140);
  });
});

describe('test solve', () => {
  test('example input expects 145', () => {
    const input: Array<string> = [
      'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7',
    ];
    expect(solve(input)).toBe(145);
  });

  xtest('puzzle input expects 244461', () => {
    const fileInput = `${__dirname}/puzzle_input.txt`;
    const input: Array<string> = readFileAsStringArray(fileInput);
    expect(solve(input)).toBe(244461);
  });
});
