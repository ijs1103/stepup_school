export const mapToRange = (array: number[], maxValue: number, newMax: number) => {
  return array.map(value => (value / maxValue) * newMax);
};
