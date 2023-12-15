export const solve = (input: Array<string>): number => {
  const patterns = [];
  let pattern = [];
  for (const index of input) {
    if (index.trim().length === 0) {
      patterns.push(pattern);
      pattern = [];
      continue;
    }
    pattern.push(index);
  }
  patterns.push(pattern);

  // Horizontal refection line
  let value = 0;
  for (pattern of patterns) {
    const reflectionLine = getHorizontalReflectionLine(pattern);
    if (reflectionLine > -1) {
      value = value + 100 * reflectionLine;
    }
  }

  for (pattern of patterns) {
    const reflectionLine = getVerticalReflectionLine(pattern);
    if (reflectionLine > -1) {
      value = value + reflectionLine;
    }
  }

  return value;
};

export const getHorizontalReflectionLine = (input: Array<string>): number => {
  let location = -1;
  //check row against previous row, if they matach, check other values
  for (let i = 1; i < input.length; i++) {
    if (input[i] !== input[i - 1]) {
      continue;
    }

    let hasReflecttionLine = true;
    for (let j = i, k = i - 1; j < input.length && k >= 0; j++, k--) {
      if (input[j] !== input[k]) {
        hasReflecttionLine = false;
        break;
      }
    }
    if (hasReflecttionLine) {
      location = i;
      break;
    }
  }
  return location;
};

export const getVerticalReflectionLine = (input: Array<string>): number => {
  //need to rotate the input 90degs and then pass to the other function

  const twistedInput = [];

  for (let j = 0; j < input[0].length; j++) {
    const tmpInput = [];
    for (let i = 0; i < input.length; i++) {
      tmpInput.push(input[i][j]);
    }
    twistedInput.push(tmpInput.join(''));
  }
  return getHorizontalReflectionLine(twistedInput);
};
