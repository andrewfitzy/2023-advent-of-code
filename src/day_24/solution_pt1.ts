class Hailstone {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;

  // calculated in the constructor
  a: number;
  b: number;
  c: number;

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

    // Maths taken from https://youtu.be/guOyA7Ijqgk?si=F7svOUN8TRG_Gp52, there is also
    // a really good write-up here:
    // https://www.geeksforgeeks.org/dsa/program-for-point-of-intersection-of-two-lines/
    //
    // Apparently a, b and c from the standard form equation
    // ax + by = c where a, b and c are constants
    // all determined from the parametric form - see the video :D
    this.a = vy;
    this.b = vx * -1;
    this.c = vy * x - vx * y;
  }
}

export const solve = (
  minXY: number,
  maxXY: number,
  input: Array<string>
): number => {
  const hailstones = [];
  for (const index of input) {
    hailstones.push(new Hailstone(index));
  }

  let collisions = 0;
  for (let i = 0; i < hailstones.length - 1; i++) {
    const stone01 = hailstones[i];
    for (let j = i + 1; j < hailstones.length; j++) {
      const stone02 = hailstones[j];
      if (collideInSpace(stone01, stone02, minXY, maxXY)) {
        collisions++;
      }
    }
  }
  return collisions;
};

const collideInSpace = (
  stone01: Hailstone,
  stone02: Hailstone,
  minXY: number,
  maxXY: number
): boolean => {
  const determinant = stone01.a * stone02.b - stone01.b * stone02.a;
  if (determinant === 0) {
    // lines are paralel so will never cross
    return false;
  }

  const collisionX =
    (stone01.c * stone02.b - stone02.c * stone01.b) / determinant;
  const collisionY =
    (stone01.a * stone02.c - stone02.a * stone01.c) / determinant;

  // check that the collision point is within the bounds of the area we are interested in.
  if (
    minXY <= collisionX &&
    collisionX <= maxXY &&
    minXY <= collisionY &&
    collisionY <= maxXY
  ) {
    if (
      (collisionX - stone01.x) * stone01.vx >= 0 &&
      (collisionY - stone01.y) * stone01.vy >= 0 &&
      (collisionX - stone02.x) * stone02.vx >= 0 &&
      (collisionY - stone02.y) * stone02.vy >= 0
    ) {
      return true;
    }
  }
  return false;
};
