export const solve = (input: Array<string>): number => {
  let total = 0;
  for (const index of input) {
    const extracted = extractNumber(index);
    total = total + extracted;
  }
  return total;
};

export const extractNumber = (input: string): number => {
  const numberMap = new Map();

  numberMap.set('one', 1);
  numberMap.set('two', 2);
  numberMap.set('three', 3);
  numberMap.set('four', 4);
  numberMap.set('five', 5);
  numberMap.set('six', 6);
  numberMap.set('seven', 7);
  numberMap.set('eight', 8);
  numberMap.set('nine', 9);

  const inputArray = input.split('');

  const digits: Array<string> = [];
  while (inputArray.length > 0) {
    const tempString: string = inputArray.join('');
    numberMap.forEach((value, key) => {
      if (tempString.startsWith(key)) {
        digits.push(value);
      }
    });

    const frontChar = inputArray.shift();
    if (frontChar === undefined) {
      break;
    }
    if (/^\d+$/.test(frontChar)) {
      digits.push(frontChar);
    }
  }
  const answer = parseInt(`${digits[0]}${digits[digits.length - 1]}`);
  return answer;
};
