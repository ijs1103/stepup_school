import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { GradientBackgroundView } from '@/shared/ui/GradientBackgroundView';
import { NavBar } from '@/shared/ui/NavBar';
import { Spacer } from '@/shared/ui/Spacer';
import { ActivityStatsBar } from '@/shared/ui/ActivityStatsBar';
import { ActivityView } from '@/shared/ui/ActivityView';
import { useActivityStats } from '@/features/walking/\bmodel/useActivityStats';
import { useAuthStore } from '@/entities/user/model/stores/useAuthStore';
import { formatWeekDates, getWeekDates } from '@/shared/lib/date/getWeekDates';
import WeeklyChart, { ChartCategory, DailyWalkingStats } from '@/shared/ui/WeeklyChart/WeeklyChart';
import { calculateStats } from '@/features/walking/lib/utils';
import { DateNavigator } from '@/shared/ui/DateNavigator';

const MyClassWeeklyChartScreen = () => {
    const { userData } = useAuthStore();
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

    //TODO: 우리반의 주간통계 데이터로 변경
    const { activityStats, stepCountData, errorMessage, refetch } = useActivityStats({
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <GradientBackgroundView colors={['#FB970C', '#F8F7F7']}>
                <NavBar title={'우리 반'} backButtonIcon={'ArrowBackWhite'} />
                <Spacer size={48} />
                <View style={styles.activityContainer}>
                    <ActivityStatsBar color={'#FB970C'} pressHandler={setSelectedCategory} />
                    <View style={styles.activityViewContainer}>
                        <ActivityView data={{ calorie: activityStats.burnedCalories, time: activityStats.walkingTime, distance: activityStats.distance }} iconColor={'#FDB44F'} textColor={'#C7BBAB'} />
                    </View>
                </View>
            </GradientBackgroundView>
            <View style={styles.chartContainer}>
                {parsedStepCountData.length > 0 ? (
                    <>
                        <DateNavigator
                            title={formatWeekDates(getWeekDates(currentWeekIndex))}
                            pressPrevHandler={pressPrevHandler}
                            pressNextHandler={pressNextHandler}
                        />
                        <WeeklyChart data={parsedStepCountData} category={selectedCategory} />
                    </>
                ) : (
                    <Text style={styles.placeholderText}>{'걸음 데이터가 없습니다.'}</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default MyClassWeeklyChartScreen;

const styles = StyleSheet.create({
    container: {
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
