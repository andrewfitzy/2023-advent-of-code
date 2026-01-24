import nerdamer from 'nerdamer-prime';

import 'nerdamer-prime/Algebra';
import 'nerdamer-prime/Calculus';
import 'nerdamer-prime/Solve';

// Convenience interface to get past a type check below
interface NerdamerSolver {
  solveEquations(equations: string[], variables: string[]): SolverPair[];
}

// Convenience type to get past a type check below
type SolverPair = [string, number];

class Hailstone {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;

  constructor(input: string) {
    const [x, y, z, vx, vy, vz] = input
      .replaceAll(',', '')
      .replaceAll('@', '')
      .split(' ')
      .filter(x => x.length > 0)
      .map(x => parseInt(x));
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
  }
}

const cross = (stone: Hailstone): number[] => {
  return [
    stone.y * stone.vz - stone.z * stone.vy,
    stone.z * stone.vx - stone.x * stone.vz,
    stone.x * stone.vy - stone.y * stone.vx,
  ];
};

const buildEquations = (stone1: Hailstone, stone2: Hailstone) => {
  const pointDiff = [
    stone1.x - stone2.x,
    stone1.y - stone2.y,
    stone1.z - stone2.z,
  ];
  const velocityDiff = [
    stone1.vx - stone2.vx,
    stone1.vy - stone2.vy,
    stone1.vz - stone2.vz,
  ];

  const c1 = cross(stone1);
  const c2 = cross(stone2);
  const rightSide = [c1[0] - c2[0], c1[1] - c2[1], c1[2] - c2[2]];

  const eqX = `(${pointDiff[1]})*vzr - (${pointDiff[2]})*vyr + (${velocityDiff[2]})*yr - (${velocityDiff[1]})*zr = ${rightSide[0]}`;
  const eqY = `(${pointDiff[2]})*vxr - (${pointDiff[0]})*vzr + (${velocityDiff[0]})*zr - (${velocityDiff[2]})*xr = ${rightSide[1]}`;
  const eqZ = `(${pointDiff[0]})*vyr - (${pointDiff[1]})*vxr + (${velocityDiff[1]})*xr - (${velocityDiff[0]})*yr = ${rightSide[2]}`;

  return [eqX, eqY, eqZ];
};

export const solve = (input: Array<string>): number => {
  const hailstones = [];
  for (const index of input) {
    hailstones.push(new Hailstone(index));
  }

  // We only need the first 3 stones to calculate a common collision point
  const selectedStones = hailstones.slice(0, 3);

  const allEquations = [
    ...buildEquations(selectedStones[0], selectedStones[1]),
    ...buildEquations(selectedStones[0], selectedStones[2]),
  ];

  //Weird double cast to satisfy the type check, first remove existing type then case to the interface above
  const solution = (nerdamer as unknown as NerdamerSolver).solveEquations(
    allEquations,
    ['xr', 'yr', 'zr', 'vxr', 'vyr', 'vzr']
  ) as SolverPair[];
  const result = Object.fromEntries(solution);

  const x = Math.round(Number(result.xr));
  const y = Math.round(Number(result.yr));
  const z = Math.round(Number(result.zr));

  const total = x + y + z;

  return total;
};
