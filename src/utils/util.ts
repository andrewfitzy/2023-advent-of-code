/**
 * Find the Greatest Common Divisor between 2 numbers.
 * @param n1
 * @param n2
 * @returns the GCD of two numbers
 */
export const gcd = (n1: number, n2: number): number => {
  if (n2 === 0) return n1;
  return gcd(n2, n1 % n2);
};

/**
 * Find the Least Common Multiplier between 2 numbers.
 * @param n1
 * @param n2
 * @returns the LCM of two numbers
 */
export const lcm = (n1: number, n2: number): number => {
  return (n1 * n2) / gcd(n1, n2);
};
