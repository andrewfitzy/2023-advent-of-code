export const solve = (input: Array<string>): number => {
  const almanac: Map<string, string[]> = new Map();
  const seeds: number[] = [];
  let mapName = '';
  let mapRows: string[] = [];
  for (const index of input) {
    if (index.startsWith('seeds:')) {
      const tmpSeeds = index
        .trim()
        .split(' ')
        .filter(seed => /^\d+$/.test(seed))
        .map(seed => parseInt(seed.trim()));
      seeds.push(...tmpSeeds);
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
  seeds: number[]
): number => {
  let lowestLocation = -1;
  for (const seed of seeds) {
    const seedToSoilMapping = mapValue(seed, almanac.get('seed-to-soil') || []);
    const soilToFertilizerMapping = mapValue(
      seedToSoilMapping,
      almanac.get('soil-to-fertilizer') || []
    );
    const fertilizerToWaterMapping = mapValue(
      soilToFertilizerMapping,
      almanac.get('fertilizer-to-water') || []
    );
    const waterToLightMapping = mapValue(
      fertilizerToWaterMapping,
      almanac.get('water-to-light') || []
    );
    const lightToTemperatureMapping = mapValue(
      waterToLightMapping,
      almanac.get('light-to-temperature') || []
    );
    const temperatureToHumidityMapping = mapValue(
      lightToTemperatureMapping,
      almanac.get('temperature-to-humidity') || []
    );
    const humidityToLocationMapping = mapValue(
      temperatureToHumidityMapping,
      almanac.get('humidity-to-location') || []
    );
    if (lowestLocation === -1 || humidityToLocationMapping < lowestLocation) {
      lowestLocation = humidityToLocationMapping;
    }
  }

  return lowestLocation;
};

const mapValue = (value: number, ranges: string[]): number => {
  if (ranges === undefined) {
    throw Error('Expected populated array   ');
  }
  let mapping = 0;
  for (const range of ranges) {
    const [destination, source, rangeLength] = range
      .split(' ')
      .map((rangePart: string) => parseInt(rangePart));
    if (source <= value && value < source + rangeLength) {
      mapping = destination + (value - source);
      break;
    }
    mapping = value;
  }
  return mapping;
};
