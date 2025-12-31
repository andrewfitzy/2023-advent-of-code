import {getInputAs2DArray, Coordinate} from '../utils/util';

export const solve = (input: Array<string>, iterations: number): number => {
  const farmPlan: string[][] = getInputAs2DArray(input);

  let sLocation = null;
  for (const rowIndex in farmPlan) {
    for (const columnIndex in farmPlan) {
      //hate the parseInt but TypeScript error reported
      const rowNumber: number = parseInt(rowIndex);
      const colNumber: number = parseInt(columnIndex);

      if (farmPlan[rowNumber][colNumber] === 'S') {
        sLocation = new Coordinate(rowNumber, colNumber);
        continue;
      }
    }
  }

  if (sLocation === null) {
    console.log('SHOULD NOT GET HERE');
    return 0;
  }

  let stepList: Set<Coordinate> = new Set();
  stepList.add(sLocation);
  for (let i = 0; i < iterations; i++) {
    stepList = getNextSteps(stepList, farmPlan);
  }
  return stepList.size;
};

export const getNextSteps = (
  stepList: Set<Coordinate>,
  farmPlan: string[][]
): Set<Coordinate> => {
  // use a map with co-ord as the key else we get duplicate co-ordinates
  const nextStepMap = new Map<string, Coordinate>();

  const possibleMoves = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  for (const location of stepList) {
    for (const [rowDelta, colDelta] of possibleMoves) {
      const nextRow = location.row + rowDelta;
      const nextCol = location.column + colDelta;
      if (
        0 <= nextRow &&
        nextRow < farmPlan.length &&
        0 <= nextCol &&
        nextCol < farmPlan[0].length &&
        farmPlan[nextRow][nextCol] !== '#'
      ) {
        // we're in bounds and the next possible cell isn't a wall
        const nextStep = new Coordinate(nextRow, nextCol);
        nextStepMap.set(nextStep.toString(), nextStep);
      }
    }
  }

  const nextStepSet: Set<Coordinate> = new Set(nextStepMap.values());
  return nextStepSet;
};
