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

  //get original locations and store in a map (number to location)
  const originalLinesMap = new Map();
  let pointer = 0;
  for (pattern of patterns) {
    pointer++;
    const hReflectionLine = getOriginalHorizontalReflectionLine(pattern);
    const vReflectionLine = getOriginalVerticalReflectionLine(pattern);
    originalLinesMap.set(pointer, [hReflectionLine, vReflectionLine]);
  }

  let value = 0;

  let tracking = 0;
  for (pattern of patterns) {
    tracking++;
    const [originalHLine, originalVLine] = originalLinesMap.get(tracking);
    let hLine = -1;
    let vLine = -1;

    const unsmudgedPatterns = unsmudgePattern(pattern);
    for (const unsmudged of unsmudgedPatterns) {
      const hReflectionLine = getNewHorizontalReflectionLine(
        originalHLine,
        unsmudged
      );
      const vReflectionLine = getNewVerticalReflectionLine(
        originalVLine,
        unsmudged
      );
      if (hReflectionLine > -1 && originalHLine !== hReflectionLine) {
        hLine = hReflectionLine;
      }
      if (vReflectionLine > -1 && originalVLine !== vReflectionLine) {
        vLine = vReflectionLine;
      }
    }

    if (hLine > -1) {
      value = value + 100 * hLine;
    }
    if (vLine > -1) {
      value = value + vLine;
    }
    if (vLine === -1 && hLine === -1) {
      throw Error('There should be one line of symmetry');
    }
  }
  return value;
};

export const getNewHorizontalReflectionLine = (
  originalHLine: number,
  input: Array<string>
): number => {
  let location = -1;
  //check row against previous row, if they match, check other values
  for (let i = 1; i < input.length; i++) {
    if (input[i] !== input[i - 1]) {
      continue;
    }

    let hasReflectionLine = true;
    for (let j = i, k = i - 1; j < input.length && k >= 0; j++, k--) {
      if (input[j] !== input[k]) {
        hasReflectionLine = false;
        break;
      }
    }
    if (hasReflectionLine && i !== originalHLine) {
      location = i;
      break;
    }
  }
  return location;
};

export const getOriginalHorizontalReflectionLine = (
  input: Array<string>
): number => {
  let location = -1;
  //check row against previous row, if they matach, check other values
  for (let i = 1; i < input.length; i++) {
    if (input[i] !== input[i - 1]) {
      continue;
    }

    let hasReflectionLine = true;
    for (let j = i, k = i - 1; j < input.length && k >= 0; j++, k--) {
      if (input[j] !== input[k]) {
        hasReflectionLine = false;
        break;
      }
    }
    if (hasReflectionLine) {
      location = i;
      break;
    }
  }
  return location;
};

export const getOriginalVerticalReflectionLine = (
  input: Array<string>
): number => {
  //need to rotate the input 90degs and then pass to the other function

  const twistedInput = [];

  for (let j = 0; j < input[0].length; j++) {
    const tmpInput = [];
    for (let i = 0; i < input.length; i++) {
      tmpInput.push(input[i][j]);
    }
    twistedInput.push(tmpInput.join(''));
  }
  return getOriginalHorizontalReflectionLine(twistedInput);
};

export const getNewVerticalReflectionLine = (
  originalVLine: number,
  input: Array<string>
): number => {
  //need to rotate the input 90degs and then pass to the other function

  const twistedInput = [];

  for (let j = 0; j < input[0].length; j++) {
    const tmpInput = [];
    for (let i = 0; i < input.length; i++) {
      tmpInput.push(input[i][j]);
    }
    twistedInput.push(tmpInput.join(''));
  }
  return getNewHorizontalReflectionLine(originalVLine, twistedInput);
};

export const unsmudgePattern = (pattern: string[]): string[][] => {
  const patterns: string[][] = [];
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      const dupePattern = duplicatePattern(pattern);
      const left = dupePattern[i].slice(0, j);
      const right = dupePattern[i].slice(j + 1, dupePattern[i].length);
      const replacementChar = dupePattern[i].charAt(j) === '.' ? '#' : '.';
      dupePattern[i] = left + replacementChar + right;
      patterns.push(dupePattern);
    }
  }
  return patterns;
};

const duplicatePattern = (pattern: string[]): string[] => {
  const duplicatePattern: string[] = [];
  for (const line of pattern) {
    duplicatePattern.push(line.slice(0, line.length));
  }
  return duplicatePattern;
};
