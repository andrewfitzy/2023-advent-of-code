export const solve = (input: Array<string>): number => {
  let total = 0;
  for (const line of input) {
    const [springs, spring_sizes] = line.split(' ');
    total = total + get_number_of_configurations(springs, spring_sizes);
  }
  return total;
};

export const get_number_of_configurations = (
  springs: string,
  spring_sizes: string
): number => {
  const number_of_unknown = springs.split('').filter(x => x === '?').length;
  const number_of_known = springs.split('').filter(x => x === '#').length;
  const number_of_springs = spring_sizes
    .split(',')
    .map(x => parseInt(x.trim()))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const blanks_in_unknown =
    number_of_unknown - (number_of_springs - number_of_known);
  const springs_in_unknown = number_of_unknown - blanks_in_unknown;

  const start = 2 ** springs_in_unknown - 1; //inclusive
  const end = 2 ** number_of_unknown - 2 ** blanks_in_unknown; // inclusive

  const spring_array = springs.split('');

  const unknown_location_indexes: Array<number> = [];
  for (let i = 0; i < spring_array.length; i++) {
    if (spring_array[i] === '?') {
      unknown_location_indexes.push(i);
    }
  }

  const spring_combinations: Array<string> = [];
  for (let i = start; i <= end; i++) {
    const spring_copy = [...spring_array];

    // convert my number to binary.
    const binaryString: string = i.toString(2).padStart(number_of_unknown, '0');

    // iterate through the bits checking if they are 1 or 0, set the associated spring
    for (let j = 0; j < binaryString.length; j++) {
      const bit = binaryString[j];

      if (bit === '1') {
        spring_copy[unknown_location_indexes[j]] = '#';
        continue;
      }
      spring_copy[unknown_location_indexes[j]] = '.';
    }

    spring_combinations.push(spring_copy.join(''));
  }

  // build a regex for validating the possible combinations
  const validation_regex = new RegExp(build_regex(spring_sizes));

  // filter to create an array of matches
  const valid_combinations = spring_combinations.filter(spring =>
    validation_regex.test(spring)
  );

  return valid_combinations.length;
};

export const build_regex = (input: string): string => {
  const inputArray = input.split(',');

  const regex_parts = [];
  for (const index of inputArray) {
    regex_parts.push(`#{${index}}`);
  }
  const regex_pattern = '^\\.*' + regex_parts.join('\\.+') + '\\.*$';
  return regex_pattern;
};
