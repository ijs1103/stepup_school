export const getCurrentWeek = (): string => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const offsetDate = now.getDate() + firstDayOfWeek - 1;
  const weekNumber = Math.ceil(offsetDate / 7);
  return `${month}월 ${weekNumber}주차`;
}
