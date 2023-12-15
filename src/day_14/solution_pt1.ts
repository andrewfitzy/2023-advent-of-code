import {Direction, rotateStringList} from '../utils/util';

export const solve = (input: Array<string>): number => {
  const rotatedBoard = rotateStringList(input, Direction.LEFT);
  let sortedBoard = [];
  for (const index of rotatedBoard) {
    const sortedLine = sortLine(index);
    sortedBoard.push(sortedLine);
  }

  sortedBoard = rotateStringList(sortedBoard, Direction.RIGHT);
  let total = 0;
  for (let i = 0; i < sortedBoard.length; i++) {
    const multiplier = sortedBoard.length - i;
    const matches = [...sortedBoard[i].matchAll(/O/g)];
    total = total + multiplier * matches.length;
  }
  return total;
};

export const sortLine = (line: string): string => {
  const parts = line.split('');

  let sortedLine: string[] = [];
  let partBuffer: string[] = [];
  for (const part of parts) {
    if (part === '#') {
      partBuffer.sort();
      partBuffer.reverse();
      sortedLine = sortedLine.concat(partBuffer);
      sortedLine.push('#');
      partBuffer = [];
      continue;
    }
    partBuffer.push(part);
  }
  if (partBuffer.length > 0) {
    partBuffer.sort();
    partBuffer.reverse();
    sortedLine = sortedLine.concat(partBuffer.join(''));
  }
  return sortedLine.join('');
};
