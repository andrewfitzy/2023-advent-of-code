const classifyPoint = require('robust-point-in-polygon');

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
  const polygon = [];
  polygon.push([location.x, location.y]);

  let min_x = 100;
  let min_y = 100;
  let max_x = 0;
  let max_y = 0;
  for (const index of input) {
    const [direction, distance] = index.split(' ');
    const next_point = getNextPoint(location, direction, parseInt(distance));
    points.push(next_point);
    location = next_point;

    polygon.push([next_point.x, next_point.y]);
    if (next_point.x < min_x) {
      min_x = next_point.x;
    }
    if (next_point.y < min_y) {
      min_y = next_point.y;
    }
    if (next_point.x > max_x) {
      max_x = next_point.x;
    }
    if (next_point.y > max_y) {
      max_y = next_point.y;
    }
  }

  let count = 0;
  for (let i = min_y; i <= max_y; i++) {
    for (let j = min_x; j <= max_x; j++) {
      const result = classifyPoint(polygon, [j, i]);
      if (result <= 0) {
        count++;
      }
    }
  }

  return count;
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
