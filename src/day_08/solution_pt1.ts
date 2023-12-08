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
  let directions = '';
  const networkMap: Map<string, Pair> = new Map();
  for (const index of input) {
    if (index.length === 0) {
      continue;
    }
    if (directions.length === 0) {
      directions = index;
      continue;
    }
    const [identifier, options] = index.split(' = ');
    const [left, right] = options.replace(/[()]*/g, '').split(', ');
    networkMap.set(identifier, new Pair(left, right));
  }
  console.log(networkMap);

  let count = 1; // start with AAA moving somewhere
  let location = 'AAA';
  for (let i = 0; i < directions.length; i++) {
    const option = networkMap.get(location);
    if (option === undefined) {
      throw Error(`Unknown location ${location}`);
    }
    const direction = directions.charAt(i);
    if (direction === 'L') {
      location = option.left;
    } else {
      location = option.right;
    }

    if (location === 'ZZZ') {
      break;
    }

    count++;
    if (i + 1 === directions.length) {
      i = -1;
    }
  }

  return count;
};
