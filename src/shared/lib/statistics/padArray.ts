export const padArray = <T>(arr: T[], length: number, fillValue: T): T[] => {
  return arr.length >= length
    ? arr
    : [...arr, ...Array(length - arr.length).fill(fillValue)];
};
