export const solve = (input: Array<string>): number => {
  const cardMap = new Map();
  for (const index of input) {
    const [cardId, cardAndWinners] = index.split(':');
    const cardNumber = parseInt(cardId.replace('Card', '').trim());
    const matches = getCardMatches(cardAndWinners);
    //for each card, always incredment the number of that card by 1
    const numberOfCards = getIncrementedValueFromMap(cardNumber, cardMap);
    cardMap.set(cardNumber, numberOfCards);

    if (matches.length > 0) {
      // for each card we've seen, e.g. if we have 2 and a copy of 2 we will run this twice
      const numberOfCards = cardMap.get(cardNumber);
      for (let i = 0; i < numberOfCards; i++) {
        // add one to n following cards for each winner, e.g. 4 winners means adding 1 to n+1, n+2, n+3 and n+4
        for (const index in matches) {
          const crdIndex = cardNumber + (parseInt(index) + 1); //point at following cards
          const newNumberOfCards = getIncrementedValueFromMap(
            crdIndex,
            cardMap
          );
          cardMap.set(crdIndex, newNumberOfCards);
        }
      }
    }
  }
  //need to sum up all the values in the map here.
  let total = 0;
  for (const value of cardMap.values()) {
    total = total + value;
  }

  return total;
};

export const getCardMatches = (cardAndWinners: string): number[] => {
  const [winningNumbersStr, cardNumbersStr] = cardAndWinners.split('|');
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

const getIncrementedValueFromMap = (
  index: number,
  map: Map<number, number>
): number => {
  let tmp = map.get(index);
  if (tmp === undefined) {
    tmp = 0;
  }
  tmp = tmp + 1;
  return tmp;
};

const getNumbersFromInput = (input: string): Set<number> => {
  const tmpInput = input.replace(/[ ]{2}/g, ' ');
  const numbers: number[] = tmpInput
    .trim()
    .split(' ')
    .map(numberStr => parseInt(numberStr.trim()));
  return new Set(numbers);
};
