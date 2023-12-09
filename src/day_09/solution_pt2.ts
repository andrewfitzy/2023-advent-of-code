export const solve = (input: Array<string>): number => {
  const sensorInputs: number[][] = [];
  for (const index of input) {
    const input: number[] = index.split(' ').map(value => parseInt(value));
    sensorInputs.push(input);
  }

  let total = 0;
  for (const sensorInput of sensorInputs) {
    const reversedInput = sensorInput.reverse();
    total = total + getPreviousNumber(reversedInput);
  }

  return total;
};

export const getPreviousNumber = (sensorInput: number[]): number => {
  let allZero = true;
  const nextRow: number[] = [];
  for (let i = 0; i < sensorInput.length; i++) {
    if (i + 1 <= sensorInput.length) {
      const left = sensorInput[i];
      const right = sensorInput[i + 1];
      const difference = right - left;
      if (!Number.isNaN(difference)) {
        nextRow.push(difference);
        if (difference !== 0) {
          allZero = false;
        }
      }
    }
  }
  if (allZero) {
    return sensorInput[0];
  }
  const nextNumber = getPreviousNumber(nextRow);
  return nextNumber + sensorInput[sensorInput.length - 1];
};
