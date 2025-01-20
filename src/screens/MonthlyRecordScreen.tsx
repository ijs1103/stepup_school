import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { MonthlyChart } from '@/shared/ui/MonthlyChart';
import { useActivityStats } from '@/features/walking/\bmodel/useActivityStats';
import { getFirstDayOfMonth } from '@/shared/lib/date/getFirstDayOfCurrentMonth';
import { getLastDayOfMonth } from '@/shared/lib/date/getLastDayOfMonth';
import { calculateStats } from '@/features/walking/lib/utils';
import { useAuthStore } from '@/entities/user/model/stores/useAuthStore';
import {
  DailyWalkingStats,
} from '@/shared/ui/MonthlyChart/MonthlyChart';
import { DateNavigator } from '@/shared/ui/DateNavigator';
import { GradientBackgroundView } from '@/shared/ui/GradientBackgroundView';
import { NavBar } from '@/shared/ui/NavBar';
import { Spacer } from '@/shared/ui/Spacer';
import { ActivityStatsBar } from '@/shared/ui/ActivityStatsBar';
import { ActivityView } from '@/shared/ui/ActivityView';
import { ChartCategory } from '@/shared/ui/WeeklyChart/WeeklyChart';

const MonthlyRecordScreen = () => {
  const { userData } = useAuthStore();
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const isCurrentMonth = new Date().getMonth() + 1 === currentMonth;
  const { activityStats, stepCountData, errorMessage: weeklyErrorMessage } = useActivityStats({
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
  }, [currentMonth, isCurrentMonth]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <GradientBackgroundView colors={['#FD4F97', '#F8F7F7']}>
        <NavBar title={'월간 통계'} backButtonIcon={'ArrowBackWhite'} />
        <Spacer size={48} />
        <View style={styles.activityContainer}>
          <ActivityStatsBar color={'#FD4F97'} pressHandler={setSelectedCategory} />
          <View style={styles.activityViewContainer}>
            <ActivityView data={{ calorie: activityStats.burnedCalories, time: activityStats.walkingTime, distance: activityStats.distance }} iconColor={'#FD4F97'} textColor={'#C7BBAB'} />
          </View>
        </View>
      </GradientBackgroundView>
      <View style={styles.chartContainer}>
        {parsedStepCountData.length > 0 ? (
          <>
            <DateNavigator
              title={`${currentMonth}월`}
              pressPrevHandler={pressPrevHandler}
              pressNextHandler={pressNextHandler}
            />
            <MonthlyChart
              data={parsedStepCountData}
              category={selectedCategory}
            />
          </>
        ) : (
          <Text style={styles.placeholderText}>{'걸음 데이터가 없습니다.'}</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default MonthlyRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  activityContainer: {
    paddingHorizontal: 14,
    gap: 18,
  },
  activityViewContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: '#F8F7F7',
  },
  placeholderText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
});
