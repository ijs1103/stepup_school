import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import {getThisWeekMonday} from '@/shared/lib/date/getThisWeekMonday';
import {getThisWeekSunday} from '@/shared/lib/date/getThisWeekSunday';
import {formatWeekDates, getWeekDates} from '@/shared/lib/date/getWeekDates';
import {WeeklyChart} from '@/shared/ui/WeeklyChart';

interface CurrentWeek {
  startDate: string;
  endDate: string;
}

const TempRecordScreen = () => {
  const {userData} = useAuthStore();
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const {stepCountData, errorMessage, refetch} = useActivityStats({
    startDate: getWeekDates(currentWeekIndex).startDate,
    endDate: getWeekDates(currentWeekIndex).endDate,
  });

  useEffect(() => {
    refetch();
  }, [currentWeekIndex, refetch]);

  const [selectedCategory, setSelectedCategory] =
    useState<ChartCategory>('stepCount');

  const parsedStepCountData = useMemo((): DailyWalkingStats[] => {
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
    setCurrentWeekIndex(prev => prev + 1);
  }, []);

  const pressNextHandler = useCallback(() => {
    if (currentWeekIndex === 0) {
      return;
    }
    setCurrentWeekIndex(prev => prev - 1);
  }, [currentWeekIndex]);

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
              <Text style={styles.dateText}>
                {formatWeekDates(getWeekDates(currentWeekIndex))}
              </Text>
            </View>
            <TouchableOpacity onPress={pressNextHandler}>
              <ChevronRight />
            </TouchableOpacity>
          </View>
          <WeeklyChart data={parsedStepCountData} category={selectedCategory} />
        </>
      ) : (
        <Text style={styles.placeholderText}>{'걸음 데이터가 없습니다.'}</Text>
      )}
    </View>
  );
};

export default TempRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hStack: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    color: '#968C7E',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  placeholderText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
});
