import {Platform} from 'react-native';

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
  if (Platform.OS === 'ios') {
    todayStartDate.setHours(
      todayStartDate.getHours() - todayStartDate.getTimezoneOffset() / 60,
    );
    return todayStartDate.toISOString().replace('Z', '+0900');
  } else {
    const koreaTime = new Date(todayStartDate.getTime() + 9 * 60 * 60 * 1000);
    return koreaTime;
  }
};
