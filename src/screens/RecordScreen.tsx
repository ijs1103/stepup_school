import { useRecordStackNavigation } from '@/app/navigation/RootNavigation';
import { useAuthStore } from '@/entities/user/model/stores/useAuthStore';
import { useTargetStepCountStore } from '@/entities/user/model/stores/useTargetStepCountStore';
import { useDailyActivityStats } from '@/features/walking/\bmodel/useDailyActivityStats';
import { useActivityStats } from '@/features/walking/model/useActivityStats';
import { matchFoodByCalories, matchTargetActivityData } from '@/features/walking/lib/utils';
import { getFirstDayOfCurrentMonth } from '@/shared/lib/date/getFirstDayOfCurrentMonth';
import { getThisWeekMonday } from '@/shared/lib/date/getThisWeekMonday';
import { getTodayFormatDate } from '@/shared/lib/date/getTodayFormatDate';
import { ActivityView } from '@/shared/ui/ActivityView';
import { DailyBurnedCaloriesView } from '@/shared/ui/DailyBurnedCaloriesView';
import { Spacer } from '@/shared/ui/Spacer';
import WeeklyStatisticsView from '@/shared/ui/WeeklyStatisticsView/WeeklyStatisticsView';
import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import OptionButton from '../../assets/option_button.svg';
import useErrorToast from '@/shared/lib/hooks/useErrorToast';

const RecordScreen = () => {
    const navigation = useRecordStackNavigation();
    const { userData } = useAuthStore();
    const { data, errorMessage: dailyErrorMessage } = useDailyActivityStats();
    const { stepCountData, errorMessage: weeklyErrorMessage } = useActivityStats({ startDate: getThisWeekMonday() });
    const { activityStats: monthlyActivityStats, errorMessage: monthlyErrorMessage } = useActivityStats({ startDate: getFirstDayOfCurrentMonth() });
    const { targetStepCount } = useTargetStepCountStore();
    useErrorToast(dailyErrorMessage);
    useErrorToast(weeklyErrorMessage);
    useErrorToast(monthlyErrorMessage);

    const targetActivityData = useMemo(() => {
        return matchTargetActivityData(userData?.gender ?? true, targetStepCount, data.burnedCalories, data.distance);
    }, [data, targetStepCount, userData?.gender]);

    const navigateToWeeklyRecord = useCallback(() => {
        navigation.navigate('WeeklyRecord');
    }, []);

    const navigateToMonthlyRecord = useCallback(() => {
        navigation.navigate('MonthlyRecord');
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{'기록'}</Text>
                <Text style={styles.todayText}>{getTodayFormatDate(new Date())}</Text>
            </View>
            <View style={styles.activityViewContainer}>
                <ActivityView data={{ calorie: data.burnedCalories, time: data.walkingTime, distance: data.distance }} iconColor={'#fff'} textColor={'#FDCA81'} />
            </View>
            <Spacer size={22} />
            <View style={styles.weeklyStatisticsViewContainer}>
                <WeeklyStatisticsView data={stepCountData} optionButtonHandler={navigateToWeeklyRecord} showDateAndOptions />
            </View>
            <View style={styles.dailyBurnedCaloriesViewContainer}>
                <DailyBurnedCaloriesView
                    food={matchFoodByCalories(data.burnedCalories)}
                    targetActivityData={targetActivityData} />
            </View>
            <View style={styles.monthlyStatisticsViewContainer}>
                <View style={styles.hStack}>
                    <Text style={styles.monthlyTitle}>{'월간 통계'}</Text>
                    <TouchableOpacity onPress={navigateToMonthlyRecord}><OptionButton fill={'#FD81B5'} /></TouchableOpacity>
                </View>
                <Spacer size={24} />
                <ActivityView data={{ calorie: monthlyActivityStats.burnedCalories, time: monthlyActivityStats.walkingTime, distance: monthlyActivityStats.distance }} iconColor={'#FD81B5'} textColor={'#C7BBAB'} />
            </View>
        </ScrollView>
    );
}

export default RecordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F0EF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 18,
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 28,
        color: '#423836',
    },
    todayText: {
        fontWeight: '300',
        lineHeight: 28,
        color: '#423836',
    },
    activityViewContainer: {
        marginHorizontal: 14,
        backgroundColor: '#FB970C',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 24,
    },
    weeklyStatisticsViewContainer: {
        borderRadius: 16,
        backgroundColor: '#fff',
        paddingTop: 26,
        paddingHorizontal: 42,
    },
    dailyBurnedCaloriesViewContainer: {
        paddingHorizontal: 16,
        marginVertical: 44,
    },
    monthlyStatisticsViewContainer: {
        borderRadius: 16,
        backgroundColor: '#fff',
        paddingTop: 26,
        paddingHorizontal: 22,
        paddingBottom: 42,
        marginBottom: 60,
    },
    hStack: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    monthlyTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#141210',
        lineHeight: 24,
    },
});
