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
  const illuminated = new Set();
  const seen = new Set();

  const contraption = getInputAs2DArray(input);
  const start = new Pointer(0, 0, Direction.RIGHT, Direction.RIGHT);
  let livePaths = [];
  livePaths.push(start);
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
  return illuminated.size;
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
