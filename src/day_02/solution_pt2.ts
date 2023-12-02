export const solve = (input: Array<string>): number => {
  let total = 0;

  for (const index of input) {
    const game = index.split(':');
    total = total + getGamePower(game[1]);
  }
  return total;
};

export const getGamePower = (input: string): number => {
  const limitMap = new Map();

  limitMap.set('red', 0);
  limitMap.set('green', 0);
  limitMap.set('blue', 0);

  const rounds = input.trim().split(';');
  for (const round of rounds) {
    const draws = round.trim().split(',');
    for (const draw of draws) {
      const cube_count = draw.trim().split(' ');
      const count = parseInt(cube_count[0]);

      if (count > limitMap.get(cube_count[1])) {
        limitMap.set(cube_count[1], count);
      }
    }
  }
  return limitMap.get('red') * limitMap.get('green') * limitMap.get('blue');
};
