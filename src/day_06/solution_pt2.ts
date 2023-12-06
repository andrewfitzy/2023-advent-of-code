export class Race {
  time: number;
  distance: number;

  constructor(time: number, distance: number) {
    this.time = time;
    this.distance = distance;
  }

  public getWinningDistances(): number[] {
    const winningDistances: number[] = [];
    for (let hold = 0; hold <= this.time; hold++) {
      const availableTravelTime = this.time - hold;
      const distanceTravelled = hold * availableTravelTime;
      if (distanceTravelled > this.distance) {
        winningDistances.push(distanceTravelled);
      }
    }
    return winningDistances;
  }
}

export const solve = (input: Array<string>): number => {
  if (input.length !== 2) {
    throw Error('Invalid input format, there should be 2 lines only');
  }

  const timeList = input[0]
    .split(':')
    .filter(value => value.length > 0)
    .map(value => value.replace(/\s+/g, ''));
  const distanceList = input[1]
    .split(':')
    .filter(value => value.length > 0)
    .map(value => value.replace(/\s+/g, ''));

  if (timeList.length !== distanceList.length) {
    throw Error(
      'Invalid input format, there should be an equal number of time and distance entries'
    );
  }

  const races: Race[] = [];
  for (let i = 1; i < timeList.length; i++) {
    races.push(new Race(parseInt(timeList[i]), parseInt(distanceList[i])));
  }

  let total = 1; //set to 1 as we're multiplying
  for (const race of races) {
    const numberOfWins: number = race.getWinningDistances().length;
    total = total * numberOfWins;
  }

  return total;
};
