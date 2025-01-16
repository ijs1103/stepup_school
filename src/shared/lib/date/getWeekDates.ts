import {Platform} from 'react-native';

export const getWeekDates = (
  weeksAgo: number,
): {startDate: string; endDate: string} => {
  const getNowInKorea = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 9 * 60 * 60 * 1000);
  };

  const today = getNowInKorea();
  const dayOfWeek = today.getDay();
  const daysToLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek;

  // 지난 주 일요일 구하기
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - daysToLastSunday - 7 * (weeksAgo - 1));
  lastSunday.setHours(23, 59, 59, 999);

  // 해당 주의 월요일 구하기
  const monday = new Date(lastSunday);
  monday.setDate(lastSunday.getDate() - 6);
  monday.setHours(0, 0, 0, 0);

  const formatDate = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - offset)
      .toISOString()
      .slice(0, -1);
    return localISOTime + '+0900';
  };

  return {
    startDate: formatDate(monday),
    endDate: formatDate(lastSunday),
  };
};

export const formatWeekDates = (weekDates: {
  startDate: string;
  endDate: string;
}): string => {
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const formatSingleDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}일`;
  };

  const formattedStart = formatSingleDate(weekDates.startDate);
  const formattedEnd = formatSingleDate(weekDates.endDate);

  return `${formattedStart} - ${formattedEnd}`;
};
