export class Lens {
  label: string;
  focalLength: number;

  constructor(label: string, focalLength: number) {
    this.label = label;
    this.focalLength = focalLength;
  }

  public isLabelEqual(otherLabel: string) {
    if (this.label === otherLabel) {
      return true;
    }
    return false;
  }
}

export const solve = (input: Array<string>): number => {
  const hashmap = new Map();
  // for(let i = 0;i<256;i++) {
  //     hashmap.set(i,[])
  // }

  const initializationSequence = input[0];
  const steps = initializationSequence.split(',');
  for (const step of steps) {
    const label = step.split(/\W/)[0];

    const boxNumber = hashValue(label);
    let box: Lens[] = hashmap.get(boxNumber);
    if (box === undefined) {
      box = [];
    }
    if (step.indexOf('=') > -1) {
      const [label, focalLength] = step.split('=');
      const lens = new Lens(label, parseInt(focalLength));
      let foundBox = -1;
      for (let i = 0; i < box.length; i++) {
        if (box[i].isLabelEqual(label)) {
          foundBox = i;
          break;
        }
      }
      if (foundBox > -1) {
        const left = box.slice(0, foundBox);
        const right = box.slice(foundBox + 1);
        hashmap.set(boxNumber, left.concat(lens).concat(right));
        continue;
      }
      box.push(lens);
      hashmap.set(boxNumber, box);
    }

    if (step.indexOf('-') > -1) {
      const label = step.substring(0, step.length - 1);
      let foundBox = -1;
      for (let i = 0; i < box.length; i++) {
        if (box[i].isLabelEqual(label)) {
          foundBox = i;
          break;
        }
      }
      if (foundBox > -1) {
        const left = box.slice(0, foundBox);
        const right = box.slice(foundBox + 1);
        hashmap.set(boxNumber, left.concat(right));
      }
    }
  }
  let totalFocusPower = 0;
  for (const [key, value] of hashmap) {
    totalFocusPower = totalFocusPower + boxPower(key, value);
  }
  return totalFocusPower;
};

export const hashValue = (input: string): number => {
  let hashValue = 0;
  for (let i = 0; i < input.length; i++) {
    const asciiValue = input.charCodeAt(i);
    hashValue = asciiValue + hashValue;
    hashValue = hashValue * 17;
    hashValue = hashValue % 256;
  }

  return hashValue;
};

export const boxPower = (boxNumber: number, box: Lens[]): number => {
  let boxPower = 0;
  if (box.length === 0) {
    return boxPower;
  }

  for (let i = 0; i < box.length; i++) {
    let lensPower = 1 + boxNumber;
    lensPower = lensPower * (i + 1);
    lensPower = lensPower * box[i].focalLength;
    boxPower = boxPower + lensPower;
  }
  return boxPower;
};
