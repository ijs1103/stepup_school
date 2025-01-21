// YYYY-MM-DD => M월 D일
export const formatDateToKorean = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
};
