// "2025-01-22T15:06:44.448Z"
// "01.22 15:06"
export const formatFeedDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${month}.${day} ${hours}:${minutes}`;
};
