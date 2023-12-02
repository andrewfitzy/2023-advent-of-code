import {readFileSync} from 'fs';

export const readFileAsStringArray = (fileName: string): Array<string> => {
  const lines: Array<string> = readFileAsString(fileName).split('\n');
  return lines;
};

export const readFileAsString = (fileName: string): string => {
  const content = readFileSync(fileName, 'utf-8');
  return content;
};
