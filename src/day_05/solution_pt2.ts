export class SeedRange {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  public toString = (): string => {
    return `SeedRange (start: ${this.start}, end: ${this.end})`;
  };
}

export const solve = (input: Array<string>) => {
  const almanac: Map<string, string[]> = new Map();
  const seeds: Array<SeedRange> = [];
  let mapName = '';
  let mapRows: string[] = [];
  for (const index of input) {
    if (index.startsWith('seeds:')) {
      const tmpSeeds = index
        .trim()
        .split(' ')
        .filter(seed => /^\d+$/.test(seed))
        .map(seed => parseInt(seed.trim()));
      for (let i = 0; i < tmpSeeds.length; i = i + 2) {
        seeds.push(new SeedRange(tmpSeeds[i], tmpSeeds[i] + tmpSeeds[i + 1]));
      }

      continue;
    }

    if (/^[a-z]+.*/.test(index)) {
      mapName = index.replace(/( map:)/, '');
      continue;
    }

    if (/^[0-9]+.*/.test(index)) {
      mapRows.push(index);
      continue;
    }
    almanac.set(mapName, mapRows);
    mapName = '';
    mapRows = [];
  }
  almanac.set(mapName, mapRows); //incase file doesn't end in a new line
  const total = findLowestLocationNumber(almanac, seeds);
  return total;
};

const findLowestLocationNumber = (
  almanac: Map<string, string[]>,
  seeds: Array<SeedRange>
) => {
  const seedToSoilMapping = processSeedsThroughStep(
    seeds,
    almanac.get('seed-to-soil') || []
  );
  const soilToFertilizerMapping = processSeedsThroughStep(
    seedToSoilMapping,
    almanac.get('soil-to-fertilizer') || []
  );
  const fertilizerToWaterMapping = processSeedsThroughStep(
    soilToFertilizerMapping,
    almanac.get('fertilizer-to-water') || []
  );
  const waterToLightMapping = processSeedsThroughStep(
    fertilizerToWaterMapping,
    almanac.get('water-to-light') || []
  );
  const lightToTemperatureMapping = processSeedsThroughStep(
    waterToLightMapping,
    almanac.get('light-to-temperature') || []
  );
  const temperatureToHumidityMapping = processSeedsThroughStep(
    lightToTemperatureMapping,
    almanac.get('temperature-to-humidity') || []
  );
  const humidityToLocationMapping = processSeedsThroughStep(
    temperatureToHumidityMapping,
    almanac.get('humidity-to-location') || []
  );

  const sortedResults = humidityToLocationMapping.sort((a, b) => {
    return a.start - b.start;
  });
  return sortedResults[0].start;
};

/*
 * Massive shout-out to HyperNeutrino for the solution to this problem. The following code block
 * is taken from the GitHub solution: https://github.com/hyper-neutrino/advent-of-code/blob/main/2023/day05p2.py
 * For more details, also see the YouTube explanation https://www.youtube.com/watch?v=NmxHw_bHhGM
 */
const processSeedsThroughStep = (
  seeds: Array<SeedRange>,
  ranges: string[]
): Array<SeedRange> => {
  if (ranges === undefined) {
    throw Error('Expected populated array   ');
  }
  const processedSeeds: Array<SeedRange> = [];
  while (seeds.length > 0) {
    const seed = seeds.shift();
    if (seed === undefined) {
      throw Error('Unexpected undefined seed');
    }

    let breakInFor = false;
    for (const range of ranges) {
      const [destination, source, rangeLength] = range
        .split(' ')
        .map((rangePart: string) => parseInt(rangePart));

      const start = Math.max(seed.start, source);
      const end = Math.min(seed.end, source + rangeLength);
      if (start < end) {
        processedSeeds.push(
          new SeedRange(
            start - source + destination,
            end - source + destination
          )
        );
        if (start > seed.start) {
          seeds.push(new SeedRange(seed.start, start));
        }
        if (seed.end > end) {
          seeds.push(new SeedRange(end, seed.end));
        }
        breakInFor = true;
        break;
      }
    }
    if (!breakInFor) {
      processedSeeds.push(new SeedRange(seed.start, seed.end));
    }
  }

  return processedSeeds;
};
