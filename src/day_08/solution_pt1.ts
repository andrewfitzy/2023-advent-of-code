export class Pair {
  left: string;
  right: string;

  constructor(start: string, end: string) {
    this.left = start;
    this.right = end;
  }

  public toString = (): string => {
    return `Pair (left: ${this.left}, right: ${this.right})`;
  };
}

export const solve = (input: Array<string>): number => {
  let directions: string[] = [];
  const networkMap: Map<string, Pair> = new Map();
  for (const index of input) {
    if (index.length === 0) {
      continue;
    }
    if (directions.length === 0) {
      directions = index.split('');
      continue;
    }
    const [identifier, options] = index.split(' = ');
    const [left, right] = options.replace(/[()]*/g, '').split(', ');
    networkMap.set(identifier, new Pair(left, right));
  }

  let count = 0;
  let location = 'AAA';

  let complete = false;
  while (!complete) {
    const option = networkMap.get(location);
    const direction = directions.shift();
    directions.push(direction!);
    location = direction === 'L' ? option!.left : option!.right;

    if (location === 'ZZZ') {
      complete = true;
    }

    count++;
  }

  return count;
};
