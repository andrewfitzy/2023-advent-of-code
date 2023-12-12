export class Coordinate {
  row: number;
  column: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  public toString = (): string => {
    return `Coordinate (row: ${this.row}, right: ${this.column})`;
  };

  public isEqual(other: Coordinate) {
    if (this.row === other.row && this.column === other.column) {
      return true;
    }
    return false;
  }

  public getManhattanDistance = (other: Coordinate): number => {
    return (
      Math.abs(other.column - this.column) + Math.abs(other.row - this.row)
    );
  };
}

export class GalaxyScaler {
  emptyRows: Set<number>;
  emptyCols: Set<number>;
  scale: number;

  constructor(emptyRows: Set<number>, emptyCols: Set<number>, scale: number) {
    this.emptyRows = emptyRows;
    this.emptyCols = emptyCols;
    this.scale = scale;
  }

  public scaleLocation = (input: Coordinate): Coordinate => {
    let tmpRow = input.row;
    let tmpCol = input.column;
    //if loc to lef or top is empty, move down/right
    for (let i = 0; i < input.row; i++) {
      if (this.emptyRows.has(i)) {
        tmpRow++;
      }
    }
    for (let i = 0; i < input.column; i++) {
      if (this.emptyCols.has(i)) {
        tmpCol++;
      }
    }
    return new Coordinate(tmpRow, tmpCol);
  };
}

export const solve = (input: Array<string>): number => {
  const galaxies: Coordinate[] = [];
  const image: string[][] = [];
  const emptyRows: Set<number> = new Set();
  let cols = 0;
  for (let i = 0; i < input.length; i++) {
    const index = input[i];
    if (index.indexOf('#') === -1) {
      emptyRows.add(i);
    }

    const row: string[] = [];
    const indexArray = index.split('');
    for (let j = 0; j < indexArray.length; j++) {
      const cellValue = indexArray[j];
      row.push(cellValue);
      if (i === 0) {
        cols++;
      }
      if (cellValue === '#') {
        galaxies.push(new Coordinate(i, j));
      }
    }
    image.push(row);
  }

  const emptyCols: Set<number> = new Set();
  for (let j = 0; j < cols; j++) {
    let isEmpty = true;
    for (let i = 0; i < image.length; i++) {
      if (image[i][j] === '#') {
        isEmpty = false;
        break;
      }
    }
    if (isEmpty) {
      emptyCols.add(j);
    }
  }

  const scaler = new GalaxyScaler(emptyRows, emptyCols, 2);

  let total = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const point1 = scaler.scaleLocation(galaxies[i]);
      const point2 = scaler.scaleLocation(galaxies[j]);
      const distance = point1.getManhattanDistance(point2);
      total = total + distance;
    }
  }

  return total;
};
