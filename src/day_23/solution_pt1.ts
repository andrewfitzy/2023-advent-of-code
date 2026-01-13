import {getInputAs2DArray, Coordinate} from '../utils/util';

const EMPTY_SPACE = '.';
const WALL = '#';
const enum Direction {
  UP = '^',
  DOWN = 'v',
  LEFT = '<',
  RIGHT = '>',
}

export class Step {
  location: Coordinate;
  cost: number;

  constructor(location: Coordinate, cost: number) {
    this.location = location;
    this.cost = cost;
  }

  public getHash(): string {
    return `${this.location.toString},${this.cost}`;
  }
}

export const solve = (input: Array<string>): number => {
  const _2dArray: string[][] = getInputAs2DArray(input);
  let start = undefined;
  let end = undefined;
  const junctions = [];
  for (let rowIdx = 0; rowIdx < _2dArray.length; rowIdx++) {
    for (let colIdx = 0; colIdx < _2dArray[rowIdx].length; colIdx++) {
      const cell = _2dArray[rowIdx][colIdx];
      if (rowIdx === 0 && cell === EMPTY_SPACE) {
        start = new Coordinate(rowIdx, colIdx);
        continue;
      }
      if (rowIdx + 1 === _2dArray.length && cell === EMPTY_SPACE) {
        end = new Coordinate(rowIdx, colIdx);
        continue;
      }
      if (cell !== WALL && isJunction(rowIdx, colIdx, _2dArray)) {
        junctions.push(new Coordinate(rowIdx, colIdx));
      }
    }
  }

  const nodeArray: Array<Coordinate> = [...junctions];
  nodeArray.push(start!);
  nodeArray.push(end!);

  const graphMap = new Map();
  const nodeArrayStrs = new Set(nodeArray.map(x => x.toString()));
  for (const node of nodeArray) {
    const dests = getDestinations(node, nodeArrayStrs, _2dArray);
    graphMap.set(node.toString(), dests);
  }

  // now can get the most costly path (longest path)
  const longestPath = getLongestPath(start!, end!, graphMap);
  return longestPath;
};

const isJunction = (
  rowIdx: number,
  colIdx: number,
  _2dArray: Array<Array<string>>
): boolean => {
  const possibleMoves = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let possibleMoveCount = 0;
  for (const [rowDelta, colDelta] of possibleMoves) {
    const nextRow = rowIdx + rowDelta;
    const nextCol = colIdx + colDelta;

    if (
      0 <= nextRow &&
      nextRow < _2dArray.length &&
      0 <= nextCol &&
      nextCol < _2dArray[0].length &&
      _2dArray[nextRow][nextCol] !== WALL
    ) {
      possibleMoveCount = possibleMoveCount + 1;
    }
  }
  if (possibleMoveCount > 2) {
    return true;
  }

  return false;
};

const getDestinations = (
  location: Coordinate,
  nodeArray: Set<string>,
  _2dArray: Array<Array<string>>
): Map<string, Step> => {
  // BFS to find the destination locations - this is the length to the next junction
  const queue: Array<Step> = [new Step(location, 0)];
  const seen: Set<string> = new Set();

  const destinations: Map<string, Step> = new Map();
  while (queue.length > 0) {
    const step = queue.shift();
    const currentlocation = step!.location;
    const currentCost = step!.cost;

    if (
      currentlocation.toString() !== location.toString() &&
      nodeArray.has(currentlocation.toString())
    ) {
      // if we are at a junction space, add a new entry to the result
      destinations.set(
        currentlocation.toString(),
        new Step(currentlocation, currentCost)
      );
      continue;
    }

    if (seen.has(currentlocation.toString())) {
      continue;
    }
    seen.add(currentlocation.toString());

    const nextMoves = getNextMoves(currentlocation, _2dArray);
    for (const move of nextMoves) {
      const newCost = currentCost + 1;
      queue.push(new Step(move, newCost));
    }
  }
  return destinations;
};

const getNextMoves = (
  location: Coordinate,
  _2dArray: Array<Array<string>>
): Array<Coordinate> => {
  const nextMoves: Array<Coordinate> = [];
  const possibleMovesMap: Map<Direction, Array<number>> = new Map();
  possibleMovesMap.set(Direction.UP, [-1, 0]);
  possibleMovesMap.set(Direction.RIGHT, [0, 1]);
  possibleMovesMap.set(Direction.DOWN, [1, 0]);
  possibleMovesMap.set(Direction.LEFT, [0, -1]);

  for (const [direction, move] of possibleMovesMap) {
    const nextRow = location.row + move[0];
    const nextCol = location.column + move[1];

    // first check we're in bounds
    if (
      0 <= nextRow &&
      nextRow < _2dArray.length &&
      0 <= nextCol &&
      nextCol < _2dArray[0].length
    ) {
      const spaceContent = _2dArray[nextRow][nextCol];
      if (spaceContent === WALL) {
        // can't move into a wall, do nothing
        continue;
      }
      if (spaceContent === EMPTY_SPACE) {
        // can move into an empty space
        nextMoves.push(new Coordinate(nextRow, nextCol));
        continue;
      }
      if (spaceContent === direction) {
        // can move into a same direction space i.e. space contains > and we're going right
        nextMoves.push(new Coordinate(nextRow, nextCol));
        continue;
      }
    }
  }
  return nextMoves;
};

const visited: Set<string> = new Set();
const getLongestPath = (
  location: Coordinate,
  destination: Coordinate,
  graphMap: Map<string, Map<string, Step>>
): number => {
  // DFS to work out the longest path
  const locationStr = location.toString();
  if (locationStr === destination.toString()) {
    return 0;
  }

  // needs to be a ver low number for the Math.max evaluation to resolve the correct result
  let runningCost = -Number.MAX_SAFE_INTEGER;

  visited.add(locationStr);
  const nextSteps = graphMap.get(locationStr);
  for (const step of nextSteps!.values()) {
    if (!visited.has(step.location.toString())) {
      runningCost = Math.max(
        runningCost,
        getLongestPath(step.location, destination, graphMap) + step.cost
      );
    }
  }
  visited.delete(locationStr);
  return runningCost;
};
