export const solve = (input: Array<string>): number => {
  let total = 0;

  for (const index of input) {
    const game = index.split(':');
    if (isValidGame(game[1])) {
      total = total + extractGameNumber(game[0]);
    }
  }
  return total;
};

export const isValidGame = (input: string): boolean => {
  const limitMap = new Map();

  limitMap.set('red', 12);
  limitMap.set('green', 13);
  limitMap.set('blue', 14);

  const rounds = input.trim().split(';');
  for (const round of rounds) {
    const draws = round.trim().split(',');
    for (const draw of draws) {
      const cube_count = draw.trim().split(' ');
      const count = parseInt(cube_count[0]);
      if (count > limitMap.get(cube_count[1])) {
        return false;
      }
    }
  }
  return true;
};

export const extractGameNumber = (input: string): number => {
  return parseInt(input.replace(/game/i, '').trim());
};
