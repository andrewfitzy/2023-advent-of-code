import {lcm} from '../utils/util';

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

  const locations = [];
  for (const key of networkMap.keys()) {
    if (key.endsWith('A')) {
      locations.push(key);
    }
  }

  /*
   * The rest takes inspiration from HyperNeutrino for the solution to this problem. The following code block
   * is taken from the GitHub solution: https://github.com/hyper-neutrino/advent-of-code/blob/main/2023/day08p2.py
   * For more details, also see the YouTube explanation https://www.youtube.com/watch?v=_nnxLcrwO_U
   */
  const cycles = [];
  for (const location of locations) {
    let tmpLocation = location;
    const tmpDirections = directions;
    const cycle = [];
    let stepCount = 0;
    let firstZEncountered = '';
    let looping = true;
    while (looping) {
      //need to recognise the point at which we start to go through the same order of locations
      while (stepCount === 0 || !tmpLocation.endsWith('Z')) {
        stepCount = stepCount + 1;
        const direction = tmpDirections.shift();
        tmpDirections.push(direction!);

        const tmpPair = networkMap.get(tmpLocation);
        tmpLocation = direction === 'L' ? tmpPair!.left : tmpPair!.right;
      }
      cycle.push(stepCount);
      if (firstZEncountered.length === 0) {
        firstZEncountered = tmpLocation;
        stepCount = 0;
      } else if (tmpLocation === firstZEncountered) {
        looping = false;
      }
    }
    cycles.push(cycle);
  }

  const stepCounts: number[] = cycles.map(cycle => cycle[0]);
  let minimumSteps = 1;
  for (const steps of stepCounts) {
    minimumSteps = lcm(steps, minimumSteps);
  }
  return minimumSteps;
};
