import {getInputAs2DArray, Coordinate} from '../utils/util';

//Not a fan of this type of problem, I followed comments on Reddit about noticing that
//the results were quadratic, so I've gone down that path. All the other solutions I
//looked at made a bunch of assumptions that didn't work for the example input, at least
//this works for both. The other solution would be a brute force that wouldn't finish in
//good time.
export const solve = (steps: number, input: Array<string>): number => {
  const farmPlan: string[][] = getInputAs2DArray(input);

  if (farmPlan.length !== farmPlan[0].length) {
    throw new Error('Input is not square');
  }

  // Work out how many times we need to grow the start mao to have a map big enough to
  // fit the number of steps that need to be taken.
  const edgeLength = farmPlan.length;
  let iterations = (steps - (steps % edgeLength)) / edgeLength;
  if (iterations % 2 === 0) {
    iterations = iterations + 1;
  }

  // Build the big farm plan so that we can get numbers of filled steps at certain intervals
  const bigFarmPlan = buildBigMap(iterations, input);
  const bigFarmEdgeLength = bigFarmPlan.length;

  // Validate we have a start cell and its in the expected place
  const sLocation = new Coordinate(
    Math.floor(bigFarmEdgeLength / 2),
    Math.floor(bigFarmEdgeLength / 2)
  );
  if (bigFarmPlan[sLocation.row].charAt(sLocation.column) !== 'S') {
    throw new Error('Start location not found');
  }

  // Now we need to iterate through the steps, working out how many step squares there are
  // at some intervals, this gives us the input to solve the quadratic.
  let stepList: Set<Coordinate> = new Set();
  stepList.add(sLocation);

  const stepsToEdge = (edgeLength - 1) / 2;
  const checkpoints = new Set(
    Array.of(
      stepsToEdge,
      stepsToEdge + edgeLength,
      stepsToEdge + edgeLength * 2
    )
  );
  const stepTargetsMapping: Map<number, number> = new Map();
  for (let i = 0; i < steps && checkpoints.size > 0; i++) {
    if (checkpoints.has(i)) {
      stepTargetsMapping.set(i, stepList.size);
      checkpoints.delete(i);
    }
    stepList = getNextSteps(stepList, bigFarmPlan);
  }

  const points = Array.from(stepTargetsMapping.values());
  const total = solveInfiniteGrid(points, steps, edgeLength);

  return total;
};

const getNextSteps = (
  stepList: Set<Coordinate>,
  farmPlan: Array<string>
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
        farmPlan[nextRow].charAt(nextCol) !== '#'
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

const buildBigMap = (
  repetitions: number,
  farmPlan: Array<string>
): Array<string> => {
  // First we need to create long rows
  const bigFarmRows: Array<string> = [];
  for (const row of farmPlan) {
    let bigRow = '';
    for (let i = 0; i < repetitions; i++) {
      bigRow = bigRow + row;
    }
    bigFarmRows.push(bigRow);
  }

  // Then we need to repeat those long rows
  const bigFarmPlan: Array<string> = [];
  for (let i = 0; i < repetitions; i++) {
    for (const bigFarmRow of bigFarmRows) {
      bigFarmPlan.push(bigFarmRow);
    }
  }
  return bigFarmPlan;
};

const solveInfiniteGrid = (
  points: number[],
  steps: number,
  edgeLength: number
): number => {
  const repetitions = Math.floor((steps - (steps % edgeLength)) / edgeLength);

  const [p0, p1, p2] = points;

  // Work out differences between points
  const d0 = p1 - p0;
  const d1 = p2 - p1;
  const secondDiff = d1 - d0;

  // Formula for f(n) = p0 + n*d0 + n*(n-1)/2 * secondDiff
  const result =
    p0 +
    repetitions * d0 +
    ((repetitions * (repetitions - 1)) / 2) * secondDiff;

  return result;
};
