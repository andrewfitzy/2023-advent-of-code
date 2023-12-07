enum HandType {
  FiveOfAKind = 10,
  FourOfAKind = 9,
  FullHouse = 8,
  ThreeOfAKind = 7,
  TwoPair = 6,
  OnePair = 5,
  High = 4,
}

export class Turn {
  hand: string;
  bid: number;
  type: HandType;

  constructor(hand: string, bid: number) {
    this.hand = hand;
    this.bid = bid;
    this.type = this.calculateType();
  }

  public toString = (): string => {
    return `Turn (hand: ${this.hand}, bid: ${this.bid}, type: ${this.type})`;
  };

  public compareTo(other: Turn): number {
    if (this.type > other.type) {
      return 1;
    }
    if (this.type < other.type) {
      return -1;
    }
    for (let i = 0; i < this.hand.length; i++) {
      const thisCardValue = this.getCardNumericValue(this.hand.charAt(i));
      const otherCardValue = this.getCardNumericValue(other.hand.charAt(i));
      if (thisCardValue > otherCardValue) {
        return 1;
      }
      if (thisCardValue < otherCardValue) {
        return -1;
      }
    }
    return 0;
  }

  private getCardNumericValue(card: string): number {
    if (card === 'A') {
      return 14;
    }
    if (card === 'K') {
      return 13;
    }
    if (card === 'Q') {
      return 12;
    }
    if (card === 'J') {
      return 1;
    }
    if (card === 'T') {
      return 10;
    }
    return parseInt(card);
  }

  private calculateType(): HandType {
    const cards: Map<string, number> = new Map();
    for (let i = 0; i < this.hand.length; i++) {
      const card = this.hand.charAt(i);
      let cardValue = cards.get(card);
      if (cardValue === undefined) {
        cardValue = 0;
      }
      cardValue++;
      cards.set(card, cardValue);
    }

    if (cards.has('J')) {
      const type = this.typeWithJack(cards);
      return type;
    }
    const type = this.typeWithoutJack(cards);

    return type;
  }
  private typeWithJack(cards: Map<string, number>): HandType {
    if (cards.size === 1) {
      return HandType.FiveOfAKind;
    }
    if (cards.size === 2) {
      return HandType.FiveOfAKind;
    }
    if (cards.size === 5) {
      return HandType.OnePair;
    }
    if (cards.size === 4) {
      return HandType.ThreeOfAKind;
    }
    if (cards.size === 3) {
      if (cards.get('J') === 2) {
        return HandType.FourOfAKind;
      }
      if (cards.get('J') === 3) {
        return HandType.FourOfAKind;
      }
      if (cards.get('J') === 1) {
        for (const [key, value] of cards.entries()) {
          if (key === 'J') {
            continue;
          }
          if (value === 2) {
            return HandType.FullHouse;
          }
          return HandType.FourOfAKind;
        }
      }
      throw Error('Unexpected number of Jacks for number of cards in hand');
    }
    throw Error('Unexpected number of cards in hand');
  }

  private typeWithoutJack(cards: Map<string, number>): HandType {
    if (cards.size === 5) {
      return HandType.High;
    }
    if (cards.size === 4) {
      return HandType.OnePair;
    }
    if (cards.size === 1) {
      return HandType.FiveOfAKind;
    }
    if (cards.size === 2) {
      for (const cardCount of cards.values()) {
        if (cardCount === 4) {
          return HandType.FourOfAKind;
        }
      }
      return HandType.FullHouse;
    }

    if (cards.size === 3) {
      for (const cardCount of cards.values()) {
        if (cardCount === 3) {
          return HandType.ThreeOfAKind;
        }
      }
    }
    return HandType.TwoPair;
  }
}
export const solve = (input: Array<string>): number => {
  const turnList = [];
  for (const index of input) {
    const parts = index.split(' ');
    if (parts.length !== 2) {
      throw Error(
        `Expected line to have two values separated by a space: ${index}`
      );
    }
    turnList.push(new Turn(parts[0], parseInt(parts[1])));
  }

  const sortedList = turnList.sort((a, b) => {
    return a.compareTo(b);
  });
  //console.log(sortedList)
  let total = 0;
  for (let i = 0; i < sortedList.length; i++) {
    total = total + (i + 1) * sortedList[i].bid;
  }
  return total;
};
