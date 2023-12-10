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
}

export const solve = (input: Array<string>): number => {
  const sLocations: Coordinate[] = [];

  const map: string[][] = [];

  for (let i = 0; i < input.length; i++) {
    const index = input[i];
    const indexArray = index.split('');

    map.push(indexArray);
    if (sLocations.length === 0) {
      for (let j = 0; j < indexArray.length; j++) {
        if (indexArray[j] === 'S') {
          sLocations.push(new Coordinate(i, j));
        }
      }
    }
  }
  if (sLocations.length === 0) {
    throw Error('Expected to find an S in the input');
  }
  const s = sLocations[0];
  const route = [];
  route.push(s);
  let previous = s;
  let location = getNextFromS(s, map);
  console.log(`${previous} moving to ${location} ${s === location}`);
  while (!s.isEqual(location)) {
    const tmpNextLocation = getNextLocation(location, previous, map);
    route.push(tmpNextLocation);
    previous = location;
    location = tmpNextLocation;
    console.log(`COMPARE ${s} moving to ${location} ${s !== location}`);
  }
  console.log(route);
  return route.length / 2;
};

export const getNextLocation = (
  currentLocation: Coordinate,
  previousLocation: Coordinate,
  map: string[][]
): Coordinate => {
  const locationValue = map[currentLocation.row][currentLocation.column];
  let nextLocation: Coordinate = currentLocation;
  switch (locationValue) {
    case '|': {
      nextLocation =
        currentLocation.row > previousLocation.row
          ? new Coordinate(currentLocation.row + 1, currentLocation.column)
          : new Coordinate(currentLocation.row - 1, currentLocation.column);
      break;
    }
    case '-': {
      nextLocation =
        currentLocation.column > previousLocation.column
          ? new Coordinate(currentLocation.row, currentLocation.column + 1)
          : new Coordinate(currentLocation.row, currentLocation.column - 1);
      break;
    }
    case 'L': {
      nextLocation =
        currentLocation.row > previousLocation.row
          ? new Coordinate(currentLocation.row, currentLocation.column + 1)
          : new Coordinate(currentLocation.row - 1, currentLocation.column);
      break;
    }
    case 'J': {
      nextLocation =
        currentLocation.row > previousLocation.row
          ? new Coordinate(currentLocation.row, currentLocation.column - 1)
          : new Coordinate(currentLocation.row - 1, currentLocation.column);
      break;
    }
    case '7': {
      nextLocation =
        currentLocation.column > previousLocation.column
          ? new Coordinate(currentLocation.row + 1, currentLocation.column)
          : new Coordinate(currentLocation.row, currentLocation.column - 1);
      break;
    }
    case 'F': {
      nextLocation =
        currentLocation.column < previousLocation.column
          ? new Coordinate(currentLocation.row + 1, currentLocation.column)
          : new Coordinate(currentLocation.row, currentLocation.column + 1);
      break;
    }
    default: {
      if (locationValue !== '.') {
        throw Error(`Unexpected Character: ${locationValue}`);
      }
      break;
    }
  }
  return nextLocation!;
};
export const getNextFromS = (
  currentLocation: Coordinate,
  map: string[][]
): Coordinate => {
  //check above
  if (currentLocation.row > 0) {
    const tmpAbove = map[currentLocation.row - 1][currentLocation.column];
    if (tmpAbove === '|' || tmpAbove === '7' || tmpAbove === 'F') {
      return new Coordinate(currentLocation.row - 1, currentLocation.column);
    }
  }
  //check right
  if (currentLocation.column + 1 < map[currentLocation.row].length) {
    const tmpRight = map[currentLocation.row][currentLocation.column + 1];
    if (tmpRight === '-' || tmpRight === 'J' || tmpRight === '7') {
      return new Coordinate(currentLocation.row, currentLocation.column + 1);
    }
  }
  //check bottom
  if (currentLocation.row + 1 < map.length) {
    const tmpBottom = map[currentLocation.row + 1][currentLocation.column];
    if (tmpBottom === '|' || tmpBottom === 'J' || tmpBottom === 'L') {
      return new Coordinate(currentLocation.row + 1, currentLocation.column);
    }
  }
  //check left
  if (currentLocation.column > 0) {
    const tmpLeft = map[currentLocation.row][currentLocation.column - 1];
    if (tmpLeft === '-' || tmpLeft === 'L' || tmpLeft === 'F') {
      return new Coordinate(currentLocation.row, currentLocation.column - 1);
    }
  }
  throw Error("Can't find next step from start step");
};
