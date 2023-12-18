import {getInputAs2DArray} from '../utils/util';

export enum Direction {
  LEFT = 4,
  RIGHT = 2,
  UP = 1,
  DOWN = 3,
}

export class Pointer {
  row: number;
  column: number;
  direction: Direction;
  previousDirection: number;

  constructor(
    row: number,
    column: number,
    direction: Direction,
    previousDirection: number
  ) {
    this.row = row;
    this.column = column;
    this.direction = direction;
    this.previousDirection = previousDirection;
  }

  public getHash(): string {
    return `${this.row},${this.column},${this.direction},${this.previousDirection}`;
  }

  public toString = (): string => {
    return `Pointer (${JSON.stringify(this)})`;
  };
}

export const solve = (input: Array<string>): number => {
  const contraption = getInputAs2DArray(input);
  let mostIlluminatedPoints = 0;
  const startingPoints = getStartingPoints(contraption);
  for (const point of startingPoints) {
    const illuminated = new Set();
    const seen = new Set();

    let livePaths = [];
    livePaths.push(point);
    while (livePaths.length > 0) {
      const tmpPoint = livePaths.shift();
      illuminated.add(`${tmpPoint?.row},${tmpPoint?.column}`);
      const nextMoves = getNextMoves(tmpPoint!, contraption);
      const nextMovesHash = nextMoves
        .map(move => move.getHash())
        .reduce((partial, a) => partial + a, '');
      if (seen.has(nextMovesHash)) {
        continue;
      }
      livePaths = livePaths.concat(nextMoves);
      seen.add(nextMovesHash);
    }
    if (illuminated.size > mostIlluminatedPoints) {
      mostIlluminatedPoints = illuminated.size;
    }
  }

  return mostIlluminatedPoints;
};

export const getStartingPoints = (input: string[][]): Pointer[] => {
  const startingPoints: Pointer[] = [];
  for (let i = 0; i < input.length; i++) {
    //add first cell
    startingPoints.push(new Pointer(i, 0, Direction.RIGHT, Direction.RIGHT));
    startingPoints.push(new Pointer(i, 0, Direction.DOWN, Direction.DOWN));
    startingPoints.push(new Pointer(i, 0, Direction.LEFT, Direction.LEFT));
    startingPoints.push(new Pointer(i, 0, Direction.UP, Direction.UP));
    if (i === 0 || i === input.length - 1) {
      for (let j = 1; j < input[i].length - 1; j++) {
        startingPoints.push(
          new Pointer(i, j, Direction.RIGHT, Direction.RIGHT)
        );
        startingPoints.push(new Pointer(i, j, Direction.DOWN, Direction.DOWN));
        startingPoints.push(new Pointer(i, j, Direction.LEFT, Direction.LEFT));
        startingPoints.push(new Pointer(i, j, Direction.UP, Direction.UP));
      }
    }
    startingPoints.push(
      new Pointer(i, input[i].length - 1, Direction.RIGHT, Direction.RIGHT)
    );
    startingPoints.push(
      new Pointer(i, input[i].length - 1, Direction.DOWN, Direction.DOWN)
    );
    startingPoints.push(
      new Pointer(i, input[i].length - 1, Direction.LEFT, Direction.LEFT)
    );
    startingPoints.push(
      new Pointer(i, input[i].length - 1, Direction.UP, Direction.UP)
    );
  }
  return startingPoints;
};

export const getNextMoves = (
  pointer: Pointer,
  input: string[][]
): Array<Pointer> => {
  //get character at pointer
  const nextMoves: Array<Pointer> = [];
  const locationCharacter = input[pointer.row][pointer.column];
  if (locationCharacter === '.') {
    if (pointer.direction === Direction.UP) {
      if (pointer.row > 0) {
        nextMoves.push(
          new Pointer(
            pointer.row - 1,
            pointer.column,
            Direction.UP,
            pointer.direction
          )
        );
      }
    }
    if (pointer.direction === Direction.RIGHT) {
      if (pointer.column < input[0].length - 1) {
        nextMoves.push(
          new Pointer(
            pointer.row,
            pointer.column + 1,
            Direction.RIGHT,
            pointer.direction
          )
        );
      }
    }
    if (pointer.direction === Direction.DOWN) {
      if (pointer.row < input.length - 1) {
        nextMoves.push(
          new Pointer(
            pointer.row + 1,
            pointer.column,
            Direction.DOWN,
            pointer.direction
          )
        );
      }
    }
    if (pointer.direction === Direction.LEFT) {
      if (pointer.column > 0) {
        nextMoves.push(
          new Pointer(
            pointer.row,
            pointer.column - 1,
            Direction.LEFT,
            pointer.direction
          )
        );
      }
    }
  }
  if (locationCharacter === '\\') {
    if (pointer.direction === Direction.UP) {
      if (pointer.column > 0) {
        nextMoves.push(
          new Pointer(
            pointer.row,
            pointer.column - 1,
            Direction.LEFT,
            pointer.direction
          )
        );
      }
    }
    if (pointer.direction === Direction.RIGHT) {
      if (pointer.row < input.length - 1) {
        nextMoves.push(
          new Pointer(
            pointer.row + 1,
            pointer.column,
            Direction.DOWN,
            pointer.direction
          )
        );
      }
    }
    if (pointer.direction === Direction.DOWN) {
      if (pointer.column < input[0].length - 1) {
        nextMoves.push(
          new Pointer(
            pointer.row,
            pointer.column + 1,
            Direction.RIGHT,
            pointer.direction
          )
        );
      }
    }
    if (pointer.direction === Direction.LEFT) {
      if (pointer.row > 0) {
        nextMoves.push(
          new Pointer(
            pointer.row - 1,
            pointer.column,
            Direction.UP,
            pointer.direction
          )
        );
      }
    }
  }
  if (locationCharacter === '/') {
    if (pointer.direction === Direction.UP) {
      if (pointer.column < input[0].length - 1) {
        nextMoves.push(
          new Pointer(
            pointer.row,
            pointer.column + 1,
            Direction.RIGHT,
            pointer.direction
          )
        );
      }
    }
    if (pointer.direction === Direction.RIGHT) {
      if (pointer.row > 0) {
        nextMoves.push(
          new Pointer(
            pointer.row - 1,
            pointer.column,
            Direction.UP,
            pointer.direction
          )
        );
      }
    }
    if (pointer.direction === Direction.DOWN) {
      if (pointer.column > 0) {
        nextMoves.push(
          new Pointer(
            pointer.row,
            pointer.column - 1,
            Direction.LEFT,
            pointer.direction
          )
        );
      }
    }
    if (pointer.direction === Direction.LEFT) {
      if (pointer.row < input.length - 1) {
        nextMoves.push(
          new Pointer(
            pointer.row + 1,
            pointer.column,
            Direction.DOWN,
            pointer.direction
          )
        );
      }
    }
  }
  if (locationCharacter === '-') {
    if (
      pointer.direction === Direction.RIGHT ||
      pointer.direction === Direction.LEFT
    ) {
      if (pointer.direction === Direction.RIGHT) {
        if (pointer.column < input[0].length - 1) {
          nextMoves.push(
            new Pointer(
              pointer.row,
              pointer.column + 1,
              Direction.RIGHT,
              pointer.direction
            )
          );
        }
      }
      if (pointer.direction === Direction.LEFT) {
        if (pointer.column > 0) {
          nextMoves.push(
            new Pointer(
              pointer.row,
              pointer.column - 1,
              Direction.LEFT,
              pointer.direction
            )
          );
        }
      }
    }
    if (
      pointer.direction === Direction.UP ||
      pointer.direction === Direction.DOWN
    ) {
      if (pointer.column < input[0].length - 1) {
        nextMoves.push(
          new Pointer(
            pointer.row,
            pointer.column + 1,
            Direction.RIGHT,
            pointer.direction
          )
        );
      }
      if (pointer.column > 0) {
        nextMoves.push(
          new Pointer(
            pointer.row,
            pointer.column - 1,
            Direction.LEFT,
            pointer.direction
          )
        );
      }
    }
  }
  if (locationCharacter === '|') {
    if (
      pointer.direction === Direction.UP ||
      pointer.direction === Direction.DOWN
    ) {
      if (pointer.direction === Direction.UP) {
        if (pointer.row > 0) {
          nextMoves.push(
            new Pointer(
              pointer.row - 1,
              pointer.column,
              Direction.UP,
              pointer.direction
            )
          );
        }
      }
      if (pointer.direction === Direction.DOWN) {
        if (pointer.row < input.length - 1) {
          nextMoves.push(
            new Pointer(
              pointer.row + 1,
              pointer.column,
              Direction.DOWN,
              pointer.direction
            )
          );
        }
      }
    }
    if (
      pointer.direction === Direction.RIGHT ||
      pointer.direction === Direction.LEFT
    ) {
      if (pointer.row > 0) {
        nextMoves.push(
          new Pointer(
            pointer.row - 1,
            pointer.column,
            Direction.UP,
            pointer.direction
          )
        );
      }
      if (pointer.row < input.length - 1) {
        nextMoves.push(
          new Pointer(
            pointer.row + 1,
            pointer.column,
            Direction.DOWN,
            pointer.direction
          )
        );
      }
    }
  }
  return nextMoves;
};
