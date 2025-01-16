import {Platform} from 'react-native';

export const getThisWeekSunday = () => {
  if (Platform.OS === 'ios') {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() + (7 - day);
    const sunday = new Date(now.getFullYear(), now.getMonth(), diff);
    sunday.setHours(23, 59, 59, 999);
    sunday.setHours(sunday.getHours() - sunday.getTimezoneOffset() / 60 + 9);
    return sunday.toISOString().replace('Z', '+0900');
  } else {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const koreaTime = new Date(utc + 9 * 60 * 60 * 1000);
    const day = koreaTime.getDay();
    const diff = koreaTime.getDate() + (7 - day);
    const sunday = new Date(koreaTime.setDate(diff));
    sunday.setHours(23, 59, 59, 999);
    return sunday.toISOString();
  }
};
