export const getLastDayOfMonth = (month: number): string => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), month, 0);
  lastDay.setHours(0, 0, 0, 0);
  lastDay.setHours(lastDay.getHours() + 9);
  return lastDay.toISOString().replace('Z', '+0900');
};
