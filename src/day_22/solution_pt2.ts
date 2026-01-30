class Brick {
  id: number;
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;

  supports: Array<Brick>;
  supportedBy: Array<Brick>;

  constructor(id: number, input: string) {
    this.id = id;
    const [x1, y1, z1, x2, y2, z2] = input
      .replaceAll('~', ',')
      .split(',')
      .map(x => parseInt(x));
    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;

    this.supports = [];
    this.supportedBy = [];
  }

  intersects = (other: Brick): boolean => {
    //check if the x and ys overlap
    if (
      other.x1 <= this.x1 &&
      other.x2 >= this.x1 &&
      other.y1 <= this.y1 &&
      other.y2 >= this.y1
    ) {
      return true;
    }
    if (
      this.x1 <= other.x1 &&
      this.x2 >= other.x1 &&
      this.y1 <= other.y1 &&
      this.y2 >= other.y1
    ) {
      return true;
    }
    if (
      other.x1 <= this.x1 &&
      other.x2 >= this.x1 &&
      this.y1 <= other.y1 &&
      this.y2 >= other.y1
    ) {
      return true;
    }
    if (
      this.x1 <= other.x1 &&
      this.x2 >= other.x1 &&
      other.y1 <= this.y1 &&
      other.y2 >= this.y1
    ) {
      return true;
    }

    return false;
  };

  clone(): Brick {
    // We don't want to re-parse the string, so we manually copy properties
    const copy = Object.create(Brick.prototype);
    Object.assign(copy, this);
    return copy;
  }
}

const compareBricksZ1 = (brick01: Brick, brick02: Brick): number => {
  if (brick01.z1 < brick02.z1) {
    return -1;
  }
  if (brick01.z1 > brick02.z1) {
    return 1;
  }
  return 0;
};

export const solve = (input: Array<string>): number => {
  const brickList: Array<Brick> = [];
  let count = 0;
  for (const index of input) {
    brickList.push(new Brick(count, index));
    count++;
  }

  // My input was in a random order, sort by Z makes dropping the
  // bricks easier.
  brickList.sort(compareBricksZ1);

  // drop the blocks
  for (let i = 0; i < brickList.length; i++) {
    const brick = brickList[i];
    let zOffset = 1; // z-index 0 is the floor
    //earlier bricks will already have fallen, see how far brick can fall
    for (let j = 0; j < i; j++) {
      const fallenBrick = brickList[j];
      if (brick.intersects(fallenBrick)) {
        zOffset = Math.max(zOffset, fallenBrick.z2 + 1);
      }
      brick.z2 = brick.z2 - (brick.z1 - zOffset);
      brick.z1 = zOffset;
    }
  }

  //Some may have fallen past others, sort again
  brickList.sort(compareBricksZ1);

  // work out what supports what
  for (let i = 0; i < brickList.length; i++) {
    for (let j = 0; j <= i; j++) {
      const bottom = brickList[j];
      const top = brickList[i];
      if (bottom.intersects(top) && top.z1 === bottom.z2 + 1) {
        bottom.supports.push(top);
        top.supportedBy.push(bottom);
      }
    }
  }

  let total = 0;
  for (const brick of brickList) {
    total = total + getRemovalImpact(brick);
  }

  return total;
};

const getRemovalImpact = (brick: Brick): number => {
  const queue: Array<Brick> = [];

  for (const upperBrick of brick.supports) {
    // only interested in bricks that are supported by one brick
    if (upperBrick.supportedBy.length === 1) {
      queue.push(upperBrick);
    }
  }

  const brickIDs = queue.map(x => x.id);
  const affectedBricks = new Set(brickIDs);
  affectedBricks.add(brick.id);

  while (queue.length > 0) {
    const fallingBrick = queue.shift();
    for (const floatingBrick of fallingBrick!.supports) {
      if (affectedBricks.has(floatingBrick.id)) {
        continue;
      }

      let allLowerBricksFalling = true;
      for (const supportee of floatingBrick.supportedBy) {
        if (!affectedBricks.has(supportee.id)) {
          allLowerBricksFalling = false;
          break;
        }
      }
      if (allLowerBricksFalling) {
        queue.push(floatingBrick);
        affectedBricks.add(floatingBrick.id);
      }
    }
  }

  affectedBricks.delete(brick.id);
  return affectedBricks.size;
};
