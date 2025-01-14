import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WeeklyStepCountData } from '@/features/walking/model/useActivityStats';
import { DAYS_OF_WEEK } from '@/shared/constants';
import { mapToRange } from '@/shared/lib/statistics/mapToRange';
import { padArray } from '@/shared/lib/statistics/padArray';

interface Props {
    data: WeeklyStepCountData | undefined;
}

const WeeklyProgressBar = ({ data }: Props) => {
    const parsedData = (data ? padArray(mapToRange(Object.values(data), 15000, 100).map(value => Math.round(value)), 7, 0) : Array(7).fill(0));
    return (
        <View style={styles.container}>
            {parsedData.map((value, index) => (
                <View key={index} style={styles.barContainer}>
                    <View style={styles.bar}>
                        <View
                            style={[
                                styles.fill,
                                {
                                    height: `${value}%`,
                                    backgroundColor: '#FDB44F',
                                },
                            ]}
                        />
                    </View>
                    <Text style={styles.dayText}>{DAYS_OF_WEEK[index]}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 22,
        height: 200,
        padding: 20,
    },
    barContainer: {
        width: 22,
        height: '100%',
        justifyContent: 'flex-end',
        gap: 8,
    },
    bar: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F2F0EF',
        borderRadius: 12,
        overflow: 'hidden',
    },
    fill: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderRadius: 12,
    },
    dayText: {
        color: '#C7BBAB',
        fontSize: 10,
        fontWeight: '300',
        textAlign: 'center',
    },
});

export default WeeklyProgressBar;
