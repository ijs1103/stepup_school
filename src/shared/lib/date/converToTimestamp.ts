export const convertToTimestamp = (dateString: string) => {
  if (!/^\d{8}$/.test(dateString)) {
    throw new Error('Invalid date format. Expected YYYYMMDD.');
  }
  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10);
  const day = parseInt(dateString.slice(6, 8), 10);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toISOString();
};
