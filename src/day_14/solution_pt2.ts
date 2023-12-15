import {Direction, rotateStringList} from '../utils/util';

export const solve = (input: Array<string>): number => {
  let count = 0;
  let rotatedBoard = input;
  let repeatingBoard = '';
  const trackingSet = new Set();
  const boardList = [];
  trackingSet.add(input.join(''));
  //should find a repeast before getting to the end.
  for (let i = 0; i < 1000000000; i++) {
    count++;
    const joinedBoard = rotatedBoard.join('');
    rotatedBoard = tiltCycle(rotatedBoard);
    if (count > 1 && trackingSet.has(joinedBoard)) {
      repeatingBoard = joinedBoard;
      break;
    }
    trackingSet.add(joinedBoard);
    boardList.push(joinedBoard);
  }

  let start = 0;
  for (let i = 0; i < boardList.length; i++) {
    if (boardList[i] === repeatingBoard) {
      start = i;
    }
  }
  const length = boardList.length - start;
  const remainingRotations = (1000000000 - boardList.length) % length;

  for (let i = 0; i < remainingRotations - 1; i++) {
    rotatedBoard = tiltCycle(rotatedBoard);
  }

  let total = 0;
  for (let i = 0; i < rotatedBoard.length; i++) {
    const multiplier = rotatedBoard.length - i;
    const matches = [...rotatedBoard[i].matchAll(/O/g)];
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

export const tiltCycle = (board: Array<string>): string[] => {
  //North - left once points top to left
  let rotatedBoard = rotateStringList(board, Direction.LEFT);
  let sortedBoard = [];
  for (const index of rotatedBoard) {
    const sortedLine = sortLine(index);
    sortedBoard.push(sortedLine);
  }
  //West - right once aligns as we started (west = left)
  rotatedBoard = rotateStringList(sortedBoard, Direction.RIGHT);
  sortedBoard = [];
  for (const index of rotatedBoard) {
    const sortedLine = sortLine(index);
    sortedBoard.push(sortedLine);
  }
  //South - right once aligns top pointing to right (south = left)
  rotatedBoard = rotateStringList(sortedBoard, Direction.RIGHT);
  sortedBoard = [];
  for (const index of rotatedBoard) {
    const sortedLine = sortLine(index);
    sortedBoard.push(sortedLine);
  }
  //East - right once aligns top pointing to botton (east = left)
  rotatedBoard = rotateStringList(sortedBoard, Direction.RIGHT);
  sortedBoard = [];
  for (const index of rotatedBoard) {
    const sortedLine = sortLine(index);
    sortedBoard.push(sortedLine);
  }
  //back to start by rotating twice
  sortedBoard = rotateStringList(sortedBoard, Direction.RIGHT);
  sortedBoard = rotateStringList(sortedBoard, Direction.RIGHT);
  return sortedBoard;
};
