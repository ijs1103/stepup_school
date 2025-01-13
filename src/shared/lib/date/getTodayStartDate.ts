export const getTodayStartDate = () => {
  const now = new Date();
  const todayStartDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0,
  );
  todayStartDate.setHours(
    todayStartDate.getHours() - todayStartDate.getTimezoneOffset() / 60,
  );
  return todayStartDate.toISOString().replace('Z', '+0900');
};
