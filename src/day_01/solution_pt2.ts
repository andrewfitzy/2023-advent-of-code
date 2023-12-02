export const solve = (input: Array<string>): number => {
  let total = 0;
  for (const index of input) {
    const extracted = extractNumber(index);
    total = total + extracted;
  }
  return total;
};

export const extractNumber = (input: string): number => {
  const map1 = new Map();

  map1.set('one', 1);
  map1.set('two', 2);
  map1.set('three', 3);
  map1.set('four', 4);
  map1.set('five', 5);
  map1.set('six', 6);
  map1.set('seven', 7);
  map1.set('eight', 8);
  map1.set('nine', 9);

  const inputArray = input.split('');

  const digits: Array<string> = [];
  while (inputArray.length > 0) {
    const tempString: string = inputArray.join('');
    map1.forEach((value, key) => {
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
