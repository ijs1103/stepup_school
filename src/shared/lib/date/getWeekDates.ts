export const getWeekDates = (weeksAgo: number): {startDate: Date; endDate: Date} => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysToLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek;
  // 지난 주 일요일 구하기
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - daysToLastSunday - 7 * (weeksAgo - 1));
  // 해당 주의 월요일 구하기
  const monday = new Date(lastSunday);
  monday.setDate(lastSunday.getDate() - 6);
  return {
    startDate: monday,
    endDate: lastSunday,
  };
};

// 사용 예시
// for (let i = 1; i <= 3; i++) {
//   const {startDate, endDate} = getWeekDates(i);
//   console.log(`${i}주 전:`);
//   console.log(`시작일(월요일): ${startDate.toISOString().split('T')[0]}`);
//   console.log(`종료일(일요일): ${endDate.toISOString().split('T')[0]}`);
//   console.log('---');
// }
