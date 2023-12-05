export const solve = (input: Array<string>): number => {
  let total = 0;
  for (const index of input) {
    const matches = getCardMatches(index);
    if (matches.length > 0) {
      const pointsValue = Math.pow(2, matches.length - 1);
      total = total + pointsValue;
    }
  }
  return total;
};

export const getCardMatches = (inputLine: string): number[] => {
  const lineParts = inputLine.split(':');
  if (lineParts.length !== 2) {
    throw new Error(`Invalid input: ${inputLine}`);
  }
  const [winningNumbersStr, cardNumbersStr] = lineParts[1].split('|');
  const winningNumbers = getNumbersFromInput(winningNumbersStr);
  const cardNumbers = getNumbersFromInput(cardNumbersStr);
  const matches = [];

  for (const winningNumber of winningNumbers) {
    if (cardNumbers.has(winningNumber)) {
      matches.push(winningNumber);
    }
  }
  return matches;
};

const getNumbersFromInput = (input: string): Set<number> => {
  const tmpInput = input.replace(/[ ]{2}/g, ' ');
  const numbers: number[] = tmpInput
    .trim()
    .split(' ')
    .map(numberStr => parseInt(numberStr.trim()));
  return new Set(numbers);
};
