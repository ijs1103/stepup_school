import React, {useCallback, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {GradientBackgroundView} from '@/shared/ui/GradientBackgroundView';
import {NavBar} from '@/shared/ui/NavBar';
import {Spacer} from '@/shared/ui/Spacer';
import {ActivityStatsBar} from '@/shared/ui/ActivityStatsBar';
import {ActivityView} from '@/shared/ui/ActivityView';
import {
  formatWeekDates,
  getWeekDates,
  getWeekDatesYYYYMMDD,
} from '@/shared/lib/date/getWeekDates';
import {ChartCategory} from '@/shared/ui/WeeklyChart/WeeklyChart';
import {DateNavigator} from '@/shared/ui/DateNavigator';
import {useActivityStatsForOurClass} from '@/features/walking/\bmodel/useActivityStatsForOurClass';
import MyClassWeeklyChart from '@/features/community/ui/MyClassWeeklyChartScreen/MyClassWeeklyChart';

const MyClassWeeklyChartScreen = () => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const {data} = useActivityStatsForOurClass({
    startDate: getWeekDatesYYYYMMDD(currentWeekIndex).startDate,
    endDate: getWeekDatesYYYYMMDD(currentWeekIndex).endDate,
  });
  const [selectedCategory, setSelectedCategory] =
    useState<ChartCategory>('stepCount');
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <GradientBackgroundView colors={['#FB970C', '#F8F7F7']}>
        <NavBar title={'우리 반'} backButtonIcon={'ArrowBackWhite'} />
        <Spacer size={48} />
        <View style={styles.activityContainer}>
          <ActivityStatsBar
            color={'#FB970C'}
            pressHandler={setSelectedCategory}
          />
          <View style={styles.activityViewContainer}>
            <ActivityView
              data={{
                calorie: data?.activityStats.burnedCalories ?? 0,
                time: data?.activityStats.walkingTime ?? 0,
                distance: data?.activityStats.distance ?? 0,
              }}
              iconColor={'#FDB44F'}
              textColor={'#C7BBAB'}
            />
          </View>
        </View>
      </GradientBackgroundView>
      <View style={styles.chartContainer}>
        <DateNavigator
          title={formatWeekDates(getWeekDates(currentWeekIndex))}
          pressPrevHandler={pressPrevHandler}
          pressNextHandler={pressNextHandler}
        />
        <MyClassWeeklyChart
          data={data?.stepCountData ?? []}
          category={selectedCategory}
        />
      </View>
    </ScrollView>
  );
};

export default MyClassWeeklyChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
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
