import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActivityStatButton from './ActivityStatButton';
import { ChartCategory } from '../WeeklyChart/WeeklyChart';
import { CATEGORY_BUTTON_LABEL } from '@/shared/constants';

interface Props {
    color: string;
    pressHandler: (category: ChartCategory) => void;
}

const ActivityStatsBar = ({ color, pressHandler }: Props) => {
    return (
        <View style={styles.container}>
            {(['stepCount', 'burnedCalories', 'distance'] as ChartCategory[]).map(value => (
                <ActivityStatButton key={value} title={CATEGORY_BUTTON_LABEL[value]} color={color} pressHandler={() => pressHandler(value)} />
            ))}
        </View>
    );
}

export default ActivityStatsBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
});

