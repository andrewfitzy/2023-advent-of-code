const itIf = (condition: boolean) => (condition ? it : it.skip);

export const testSkipsCi = itIf(!process.env.CI);
