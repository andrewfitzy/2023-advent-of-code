import {getInputAs2DArray} from '../utils/util';
import {PriorityQueue, ICompare} from '@datastructures-js/priority-queue';

export class Step {
  heatLoss: number;
  row: number;
  column: number;
  directionRow: number;
  directionColumn: number;
  moves: number;

  constructor(
    heatLoss: number,
    row: number,
    column: number,
    directionRow: number,
    directionColumn: number,
    moves: number
  ) {
    this.heatLoss = heatLoss;
    this.row = row;
    this.column = column;
    this.directionRow = directionRow;
    this.directionColumn = directionColumn;
    this.moves = moves;
  }

  public getHash(): string {
    return `${this.row},${this.column},${this.directionRow},${this.directionColumn},${this.moves}`;
  }
}

const compareCityBlocks: ICompare<Step> = (a: Step, b: Step) => {
  // prioritize lowest heat loss
  return a.heatLoss < b.heatLoss ? -1 : 1;
};

export const solve = (input: Array<string>): number => {
  let total = 0;

  const map = getInputAs2DArray(input);

  const seenStepHashes = new Set();
  const stepsQueue = new PriorityQueue<Step>(compareCityBlocks);

  const startingStep = new Step(0, 0, 0, 0, 0, 0);
  stepsQueue.enqueue(startingStep);

  while (!stepsQueue.isEmpty()) {
    const step = stepsQueue.pop();

    if (step.row === map.length - 1 && step.column === map[0].length - 1) {
      total = step.heatLoss;
      break;
    }

    if (seenStepHashes.has(step.getHash())) {
      continue;
    }

    seenStepHashes.add(step.getHash());

    if (
      step.moves < 3 &&
      `${step.directionRow},${step.directionColumn}` !== `${0},${0}`
    ) {
      const nextRow = step.row + step.directionRow;
      const nextColumn = step.column + step.directionColumn;
      if (
        0 <= nextRow &&
        nextRow < map.length &&
        0 <= nextColumn &&
        nextColumn < map[0].length
      ) {
        const newStep = new Step(
          step.heatLoss + parseInt(map[nextRow][nextColumn]),
          nextRow,
          nextColumn,
          step.directionRow,
          step.directionColumn,
          step.moves + 1
        );
        stepsQueue.enqueue(newStep);
      }
    }

    const possibleMoves = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    for (const [nextDirectionRow, nextDirectionColumn] of possibleMoves) {
      const forwardDirectionCheck =
        `${nextDirectionRow},${nextDirectionColumn}` !==
        `${step.directionRow},${step.directionColumn}`;
      const backwardDirectionCheck =
        `${nextDirectionRow},${nextDirectionColumn}` !==
        `${-step.directionRow},${-step.directionColumn}`;
      if (forwardDirectionCheck && backwardDirectionCheck) {
        const nextRow = step.row + nextDirectionRow;
        const nextColumn = step.column + nextDirectionColumn;
        if (
          0 <= nextRow &&
          nextRow < map.length &&
          0 <= nextColumn &&
          nextColumn < map[0].length
        ) {
          const newStep = new Step(
            step.heatLoss + parseInt(map[nextRow][nextColumn]),
            nextRow,
            nextColumn,
            nextDirectionRow,
            nextDirectionColumn,
            1
          );
          stepsQueue.enqueue(newStep);
        }
      }
    }
  }
  return total;
};
