export const getKoreaEndTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const koreaTime = new Date(utc + 9 * 60 * 60 * 1000);
  return koreaTime.toISOString();
};
