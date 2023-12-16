import {getInputAs2DArray} from '../utils/util';

export const solve = (input: Array<string>): number => {
  const numberList: number[] = [];
  let numberBuffer: string[] = [];
  let adjacentCellBuffer: string[] = [];
  const _2dArray: string[][] = getInputAs2DArray(input);
  let numberStart = -1;
  let numberEnd = -1;
  const starMap = new Map();

  for (const rowIndex in _2dArray) {
    for (const columnIndex in _2dArray) {
      const rowNumber: number = parseInt(rowIndex);
      const colNumber: number = parseInt(columnIndex);

      //if we have a number
      if (/^\d+$/.test(_2dArray[rowNumber][colNumber])) {
        if (numberStart === -1) {
          numberStart = colNumber;
        }
        numberBuffer.push(_2dArray[rowNumber][colNumber]);
        const adjacentCells = getAdjacentCells(rowNumber, colNumber, _2dArray);
        adjacentCellBuffer = adjacentCellBuffer.concat(adjacentCells);
        numberEnd = colNumber;
        continue;
      }

      if (numberBuffer.length > 0) {
        //check if we have any *
        const otherCells = adjacentCellBuffer.filter(x => /^[*]+$/.test(x));
        if (otherCells.length > 0) {
          const operand = parseInt(numberBuffer.join(''));
          numberList.push(operand);
          const starLocation = getStarLocation(
            rowNumber,
            numberStart,
            numberEnd,
            _2dArray
          );
          if (starLocation.length > 0) {
            let operandList = [];
            if (starMap.has(starLocation)) {
              operandList = starMap.get(starLocation);
            }
            operandList.push(operand);
            starMap.set(starLocation, operandList);
          }
        }
        numberBuffer = [];
        adjacentCellBuffer = [];
        numberStart = -1;
        numberEnd = -1;
      }
    }
  }

  let runningTotal = 0;
  for (const value of starMap.values()) {
    if (value.length !== 2) {
      continue;
    }
    let entryTotal = 0;
    entryTotal = value[0] * value[1];
    runningTotal = runningTotal + entryTotal;
  }

  return runningTotal;
};

export const getStarLocation = (
  row: number,
  start: number,
  end: number,
  input: string[][]
): string => {
  const locations: string[] = [];
  for (let i = start; i <= end; i++) {
    const location = findCell(row, i, input, '*');
    if (location.length > 0) {
      locations.push(location);
    }
  }
  return locations[0];
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
  if (row + 1 < input.length && input[row].length) {
    adjacentCells.push(input[row + 1][column + 1]);
  }

  return adjacentCells;
};

export const findCell = (
  row: number,
  column: number,
  input: string[][],
  charToFind: string
): string => {
  //get above left
  if (row - 1 >= 0 && column - 1 >= 0) {
    if (input[row - 1][column - 1] === charToFind) {
      return `${row - 1},${column - 1}`;
    }
  }
  //get above
  if (row - 1 >= 0) {
    if (input[row - 1][column] === charToFind) {
      return `${row - 1},${column}`;
    }
  }
  //get above right
  if (row - 1 >= 0 && column + 1 <= input[row].length) {
    if (input[row - 1][column + 1] === charToFind) {
      return `${row - 1},${column + 1}`;
    }
  }

  //get left
  if (column - 1 >= 0) {
    if (input[row][column - 1] === charToFind) {
      return `${row},${column - 1}`;
    }
  }
  //get right
  if (column + 1 <= input[row].length) {
    if (input[row][column + 1] === charToFind) {
      return `${row},${column + 1}`;
    }
  }

  //get below left
  if (row + 1 < input.length && column - 1 >= 0) {
    if (input[row + 1][column - 1] === charToFind) {
      return `${row + 1},${column - 1}`;
    }
  }
  //get below
  if (row + 1 < input.length) {
    if (input[row + 1][column] === charToFind) {
      return `${row + 1},${column}`;
    }
  }
  //get below right
  if (row + 1 < input.length && column + 1 <= input[row].length) {
    if (input[row + 1][column + 1] === charToFind) {
      return `${row + 1},${column + 1}`;
    }
  }
  return '';
};
