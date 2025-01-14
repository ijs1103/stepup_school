export const getFirstDayOfCurrentMonth = (): string => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  firstDay.setHours(0, 0, 0, 0);
  firstDay.setHours(firstDay.getHours() + 9);
  return firstDay.toISOString().replace('Z', '+0900');
};
