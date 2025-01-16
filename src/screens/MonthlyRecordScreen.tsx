import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {MonthlyChart} from '@/shared/ui/MonthlyChart';
import {useActivityStats} from '@/features/walking/\bmodel/useActivityStats';
import {getFirstDayOfMonth} from '@/shared/lib/date/getFirstDayOfCurrentMonth';
import ChevronLeft from '../../assets/prev_button.svg';
import ChevronRight from '../../assets/chevron_front.svg';
import {getLastDayOfMonth} from '@/shared/lib/date/getLastDayOfMonth';
import {calculateStats} from '@/features/walking/lib/utils';
import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import {
  ChartCategory,
  DailyWalkingStats,
} from '@/shared/ui/MonthlyChart/MonthlyChart';
import {ActivityStats} from '@/features/walking/\bmodel/useDailyActivityStats';

const MonthlyRecordScreen = () => {
  const {userData} = useAuthStore();
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const isCurrentMonth = new Date().getMonth() + 1 === currentMonth;
  const {stepCountData, errorMessage: weeklyErrorMessage} = useActivityStats({
    startDate: getFirstDayOfMonth(currentMonth),
    endDate: isCurrentMonth
      ? new Date().toISOString()
      : getLastDayOfMonth(currentMonth),
  });
  const [selectedCategory, setSelectedCategory] =
    useState<ChartCategory>('stepCount');

  const parsedStepCountData: DailyWalkingStats[] = useMemo(() => {
    if (!stepCountData) {
      return [];
    }
    return Object.entries(stepCountData).map(([date, steps]) => {
      const stats = calculateStats(userData?.gender ?? true, steps);
      return {
        date,
        ...stats,
      };
    });
  }, [stepCountData, userData]);
  const pressPrevHandler = useCallback(() => {
    const isCurrentMonthJanuary = currentMonth === 1;
    if (isCurrentMonthJanuary) {
      return;
    }
    setCurrentMonth(prev => prev - 1);
  }, [currentMonth]);

  const pressNextHandler = useCallback(() => {
    const isCurrentMonthDecember = currentMonth === 12;
    if (isCurrentMonthDecember || isCurrentMonth) {
      return;
    }
    setCurrentMonth(prev => prev + 1);
  }, [currentMonth]);

  return (
    <View style={styles.container}>
      {parsedStepCountData.length > 0 ? (
        <>
          <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setSelectedCategory('stepCount')}>
              <Text>{'걸음수'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedCategory('burnedCalories')}>
              <Text>{'칼로리'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedCategory('distance')}>
              <Text>{'거리'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hStack}>
            <TouchableOpacity onPress={pressPrevHandler}>
              <ChevronLeft />
            </TouchableOpacity>
            <View>
              <Text style={styles.dateText}>{`${currentMonth}월`}</Text>
            </View>
            <TouchableOpacity onPress={pressNextHandler}>
              <ChevronRight />
            </TouchableOpacity>
          </View>
          <MonthlyChart
            data={parsedStepCountData}
            category={selectedCategory}
          />
        </>
      ) : (
        <Text style={styles.placeholderText}>{'걸음 데이터가 없습니다.'}</Text>
      )}
    </View>
  );
};

export default MonthlyRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hStack: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
  dateText: {
    color: '#968C7E',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
});
