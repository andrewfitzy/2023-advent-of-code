export const solve = (input: Array<string>): number => {
  let total = 0;

  const initializationSequence = input[0];
  const steps = initializationSequence.split(',');
  for (const step of steps) {
    total = total + hashValue(step);
  }

  return total;
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
