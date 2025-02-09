import React, {useCallback, useEffect, useMemo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import usePermissions from '@/shared/lib/hooks/usePermissions';
import {useAuthStore} from '@/features/user/model/stores/useAuthStore';
import StepupLogo from '../../assets/stepup_logo_small.svg';
import MyInfo from '../../assets/my_info.svg';
import {useHomeStackNavigation} from '@/app/navigation/RootNavigation';
import {Spacer} from '@/shared/ui/Spacer';
import DailyActivityCard from '@/features/walking/ui/HomeScreen/DailyActivityCard';
import {DailyBurnedCaloriesView} from '@/shared/ui/DailyBurnedCaloriesView';
import {Carousel} from '@/shared/ui/Carousel';
import WeeklyStatisticsView from '@/shared/ui/WeeklyStatisticsView/WeeklyStatisticsView';
import {Divider} from '@/shared/ui/Divider';
import useHealthKitSetup from '@/features/walking/\bmodel/useHealthKitSetup';
import {useDailyActivityStats} from '@/features/walking/\bmodel/useDailyActivityStats';
import {
  matchFoodByCalories,
  matchTargetActivityData,
} from '@/features/walking/lib/utils';
import {useActivityStats} from '@/features/walking/model/useActivityStats';
import {getThisWeekMonday} from '@/shared/lib/date/getThisWeekMonday';
import {useTargetStepCountStore} from '@/features/user/model/stores/useTargetStepCountStore';
import useErrorToast from '@/shared/lib/hooks/useErrorToast';
import setupGoogleFit from '@/features/walking/\bmodel/useGoogleFitSetup';

const HomeScreen = () => {
  const navigation = useHomeStackNavigation();
  const {logout, userData} = useAuthStore();
  const {permissions, isCompleted: isPermssionsCompleted} = usePermissions();
  useEffect(() => {
    if (isPermssionsCompleted) {
      setupGoogleFit();
    }
  }, [isPermssionsCompleted]);
  const {
    hasPermissions: hasHealthKitPermissions,
    hasRequestedPermissions: hasRequestedHealthKitPermissions,
  } = useHealthKitSetup();
  const {
    data,
    refetch: dailyDataRefetch,
    isRefetching,
    errorMessage: dailyErrorMessage,
  } = useDailyActivityStats();
  const {
    stepCountData,
    errorMessage: weeklyErrorMessage,
    refetch: weeklyDataRefetch,
  } = useActivityStats({
    startDate: getThisWeekMonday(),
  });
  const {targetStepCount} = useTargetStepCountStore();
  useErrorToast(dailyErrorMessage);
  useErrorToast(weeklyErrorMessage);
  const myInfoHandler = useCallback(() => {
    navigation.navigate('SettingsMain');
  }, []);

  const navigateToPedometerSettings = useCallback(() => {
    navigation.navigate('PedometerSettings');
  }, []);

  const bannerImageSources = useMemo(() => {
    return [
      require('../../assets/banner_example.png'),
      require('../../assets/banner_example.png'),
      require('../../assets/banner_example.png'),
    ];
  }, []);

  const targetActivityData = useMemo(() => {
    return matchTargetActivityData(
      userData?.gender ?? true,
      targetStepCount,
      data.burnedCalories,
      data.distance,
    );
  }, [data, targetStepCount, userData?.gender]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={() => {
            dailyDataRefetch();
            weeklyDataRefetch();
          }}
          tintColor={'#FB970C'}
          colors={['#FB970C']}
        />
      }>
      <View style={styles.navBar}>
        <StepupLogo />
        <TouchableOpacity onPress={myInfoHandler}>
          <MyInfo />
        </TouchableOpacity>
      </View>
      <Spacer size={16} />
      <View style={styles.cardContainer}>
        <DailyActivityCard
          data={data}
          optionButtonHandler={navigateToPedometerSettings}
          targetStepCount={targetStepCount}
        />
      </View>
      <Spacer size={18} />
      <Carousel images={bannerImageSources} height={110} />
      <Spacer size={36} />
      <View style={styles.caloriesViewContainer}>
        <DailyBurnedCaloriesView
          food={matchFoodByCalories(data.burnedCalories)}
          targetActivityData={targetActivityData}
        />
      </View>
      <Spacer size={48} />
      <View style={styles.weeklyStatisticsContainer}>
        <Divider />
        <WeeklyStatisticsView data={stepCountData} />
      </View>
      <Spacer size={16} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 22,
    paddingHorizontal: 18,
  },
  cardContainer: {
    paddingHorizontal: 12,
  },
  caloriesViewContainer: {
    paddingHorizontal: 16,
  },
  weeklyStatisticsContainer: {
    paddingHorizontal: 38,
  },
});
