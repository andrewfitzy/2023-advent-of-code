export enum Direction {
  LEFT,
  RIGHT,
}

/**
 * Find the Greatest Common Divisor between 2 numbers.
 * @param n1
 * @param n2
 * @returns the GCD of two numbers
 */
export const gcd = (n1: number, n2: number): number => {
  if (n2 === 0) return n1;
  return gcd(n2, n1 % n2);
};

/**
 * Find the Least Common Multiplier between 2 numbers.
 * @param n1
 * @param n2
 * @returns the LCM of two numbers
 */
export const lcm = (n1: number, n2: number): number => {
  return (n1 * n2) / gcd(n1, n2);
};

/**
 *
 * @param input Converts an array of strings into a 2D array of characters.
 * @returns a 2d array from the spplied input
 */
export const getInputAs2DArray = (input: Array<string>): string[][] => {
  const _2dArray: string[][] = [];

  for (const index of input) {
    const indexArray = index.split('');
    _2dArray.push(indexArray);
  }
  return _2dArray;
};

/**
 * For example
 * abc
 * def
 * ghi
 *
 * when rotated LEFT becomes
 * cfi
 * beh
 * adg
 *
 * when rotated RIGHT becomes
 * gda
 * heb
 * ifc
 *
 * @param input
 */
export const rotateStringList = (
  input: Array<string>,
  direction: Direction
): Array<string> => {
  const rotatedList: Array<string> = [];
  if (input.length === 0) {
    return rotatedList;
  }
  if (direction === Direction.LEFT) {
    for (let j = input[0].length - 1; j >= 0; j--) {
      const column = [];
      for (let i = 0; i < input.length; i++) {
        column.push(input[i].charAt(j));
      }
      rotatedList.push(column.join(''));
    }
  }
  if (direction === Direction.RIGHT) {
    for (let j = 0; j < input[0].length; j++) {
      const column = [];
      for (let i = input.length - 1; i >= 0; i--) {
        column.push(input[i].charAt(j));
      }
      rotatedList.push(column.join(''));
    }
  }
  return rotatedList;
};
