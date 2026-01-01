export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public toString = (): string => {
    return `${this.x},${this.y}`;
  };

  public isEqual(other: Point) {
    if (this.y === other.y && this.x === other.x) {
      return true;
    }
    return false;
  }
}

export const solve = (input: Array<string>): number => {
  const points: Array<Point> = [];
  let location: Point = new Point(0, 0);
  points.push(location);

  let perimeter = 0;
  for (const index of input) {
    const colour = index.split(' ')[2];
    const [directionStr, distanceStr] = convertColour(colour);
    const distance = parseInt(distanceStr);
    const next_point = getNextPoint(location, directionStr, distance);
    points.push(next_point);
    location = next_point;

    perimeter = perimeter + distance;
  }

  const area = getArea(points, perimeter);

  return area;
};

export const getArea = (points: Array<Point>, perimeter: number): number => {
  /**
   * Uses the shoelace formula (https://en.wikipedia.org/wiki/Shoelace_formula)
   * to calculate the area... also taking in the perimeter as there is a perimeter
   * of 1 cube wide.
   */
  const numberOfPoints = points.length;
  let area = 0;
  for (let i = 0; i < numberOfPoints - 1; i++) {
    area =
      area + (points[i].x * points[i + 1].y - points[i + 1].x * points[i].y);
  }
  const totalArea = Math.abs(area + perimeter) / 2.0;
  return totalArea + 1;
};

export const getNextPoint = (
  location: Point,
  direction: string,
  distance: number
): Point => {
  if (direction === 'U') {
    return new Point(location.x, location.y - distance);
  }
  if (direction === 'R') {
    return new Point(location.x + distance, location.y);
  }
  if (direction === 'D') {
    return new Point(location.x, location.y + distance);
  }
  // LEFT
  return new Point(location.x - distance, location.y);
};

export const convertColour = (colour: string): Array<string> => {
  const distance_hex = colour.substring(2, 7);
  const distance = `${parseInt(distance_hex, 16)}`;
  // 0 means R, 1 means D, 2 means L, and 3 means U.
  if (colour.substring(7, 8) === '0') {
    return ['R', distance];
  }
  if (colour.substring(7, 8) === '1') {
    return ['D', distance];
  }
  if (colour.substring(7, 8) === '2') {
    return ['L', distance];
  }
  if (colour.substring(7, 8) === '3') {
    return ['U', distance];
  }
  return ['', ''];
};
