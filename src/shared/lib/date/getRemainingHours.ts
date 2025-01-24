export const getRemainingHours = (dateString: string): number => {
  const endDate = new Date(dateString);
  endDate.setHours(23, 59, 59, 999);
  const now = new Date();
  const timeDiff = endDate.getTime() - now.getTime();
  const hoursRemaining = Math.ceil(timeDiff / (1000 * 60 * 60));
  return Math.max(hoursRemaining, 0);
};
