import {Platform} from 'react-native';

export const getThisWeekMonday = () => {
  if (Platform.OS === 'ios') {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.getFullYear(), now.getMonth(), diff);
    monday.setHours(0, 0, 0, 0);
    monday.setHours(monday.getHours() - monday.getTimezoneOffset() / 60 + 9);
    return monday.toISOString().replace('Z', '+0900');
  } else {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const koreaTime = new Date(utc + 9 * 60 * 60 * 1000);
    const day = koreaTime.getDay();
    const diff = koreaTime.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(koreaTime.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString();
  }
};
