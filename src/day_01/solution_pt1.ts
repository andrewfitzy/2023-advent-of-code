export const solve = (input: Array<string>): number => {
  let total = 0;
  for (const index of input) {
    total = total + extractNumber(index);
  }
  return total;
};

export const extractNumber = (input: string): number => {
  const inputArray = input.split('');

  const digits = [];
  for (const index of inputArray) {
    if (/^\d+$/.test(index)) {
      digits.push(index);
    }
  }
  const answer = parseInt(`${digits[0]}${digits[digits.length - 1]}`);
  return answer;
};
