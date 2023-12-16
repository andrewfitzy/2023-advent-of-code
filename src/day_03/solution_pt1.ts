import {getInputAs2DArray} from '../utils/util';

export const solve = (input: Array<string>): number => {
  const numberList: number[] = [];
  let numberBuffer: string[] = [];
  let adjacentCellBuffer: string[] = [];
  const _2dArray: string[][] = getInputAs2DArray(input);
  for (const rowIndex in _2dArray) {
    for (const columnIndex in _2dArray) {
      //hate the parseInt but TypeScript error reported
      const rowNumber: number = parseInt(rowIndex);
      const colNumber: number = parseInt(columnIndex);
      //if we have a number
      if (/^\d+$/.test(_2dArray[rowNumber][colNumber])) {
        numberBuffer.push(_2dArray[rowNumber][colNumber]);

        const adjacentCells = getAdjacentCells(rowNumber, colNumber, _2dArray);
        adjacentCellBuffer = adjacentCellBuffer.concat(adjacentCells);
        continue;
      }

      if (numberBuffer.length > 0) {
        //check if we have anything other than number or .
        const otherCells = adjacentCellBuffer.filter(x => /^[^\d.]+$/.test(x));
        if (otherCells.length > 0) {
          numberList.push(parseInt(numberBuffer.join('')));
        }
        numberBuffer = [];
        adjacentCellBuffer = [];
      }
    }
  }

  const total = numberList.reduce((partialSum, a) => partialSum + a, 0);
  return total;
};

export const getAdjacentCells = (
  row: number,
  column: number,
  input: string[][]
): string[] => {
  const adjacentCells: string[] = [];

  //get above left
  if (row - 1 >= 0 && column - 1 >= 0) {
    adjacentCells.push(input[row - 1][column - 1]);
  }
  //get above
  if (row - 1 >= 0) {
    adjacentCells.push(input[row - 1][column]);
  }
  //get above right
  if (row - 1 >= 0 && column + 1 <= input[row].length) {
    adjacentCells.push(input[row - 1][column + 1]);
  }

  //get left
  if (column - 1 >= 0) {
    adjacentCells.push(input[row][column - 1]);
  }
  //get right
  if (column + 1 <= input[row].length) {
    adjacentCells.push(input[row][column + 1]);
  }

  //get below left
  if (row + 1 < input.length && column - 1 >= 0) {
    adjacentCells.push(input[row + 1][column - 1]);
  }
  //get below
  if (row + 1 < input.length) {
    adjacentCells.push(input[row + 1][column]);
  }
  //get below right
  if (row + 1 < input.length && column + 1 <= input[row].length) {
    adjacentCells.push(input[row + 1][column + 1]);
  }

  return adjacentCells;
};
