export const solve = (input: Array<string>): number => {
  let total = 0;
  for (const line of input) {
    const [springs, spring_sizes] = line.split(' ');

    let expandedSprings = '';
    let expandedSizesStr = '';
    for (let i = 0; i < 5; i++) {
      if (expandedSprings.length > 0) {
        expandedSprings = expandedSprings + '?';
        expandedSizesStr = expandedSizesStr + ',';
      }
      expandedSprings = expandedSprings + springs;
      expandedSizesStr = expandedSizesStr + spring_sizes;
    }

    const expandedSizes = expandedSizesStr.split(',').map(x => parseInt(x));
    total = total + getNumberOfConfigurations(expandedSprings, expandedSizes);
  }
  return total;
};

const cache = new Map();
export const getNumberOfConfigurations = (
  springs: string,
  springSizes: Array<number>
): number => {
  /*
   * This takes inspiration from HyperNeutrino for the solution to this problem. The following code block
   * is taken from the GitHub solution: https://github.com/hyper-neutrino/advent-of-code/blob/main/2023/day12p2.py
   * For more details, also see the YouTube explanation https://youtu.be/g3Ms5e7Jdqo?si=LgVY6jjrnPpVQnVp
   */
  if (springs === '') {
    if (springSizes.length === 0) {
      return 1;
    }
    return 0;
  }

  if (springSizes.length === 0) {
    if (springs.includes('#')) {
      return 0;
    }
    return 1;
  }

  const cacheKey = springs + '-' + springSizes.join(',');
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  let result = 0;

  if (springs[0] === '.' || springs[0] === '?') {
    result =
      result + getNumberOfConfigurations(springs.substring(1), springSizes);
  }

  if (springs[0] === '#' || springs[0] === '?') {
    if (springSizes[0] <= springs.length) {
      if (!springs.substring(0, springSizes[0]).includes('.')) {
        if (
          springSizes[0] === springs.length ||
          springs[springSizes[0]] !== '#'
        ) {
          const stringStart = springSizes[0] + 1;
          result =
            result +
            getNumberOfConfigurations(
              springs.substring(stringStart),
              springSizes.slice(1)
            );
        }
      }
    }
  }
  cache.set(cacheKey, result);
  return result;
};
