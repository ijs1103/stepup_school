export const getThisWeekMonday = () => {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.getFullYear(), now.getMonth(), diff);
  monday.setHours(0, 0, 0, 0);
  // 한국 시간으로 조정
  monday.setHours(monday.getHours() - monday.getTimezoneOffset() / 60 + 9);
  return monday.toISOString().replace('Z', '+0900');
};
