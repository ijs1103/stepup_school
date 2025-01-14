import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WeeklyProgressBar } from '../WeeklyProgressBar';
import OptionButton from '../../../../assets/option_button.svg';
import { Spacer } from '../Spacer';
import { WeeklyStepCountData } from '@/features/walking/model/useActivityStats';
import { getCurrentWeek } from '@/shared/lib/date/getCurrentWeek';

interface Props {
    data: WeeklyStepCountData | undefined;
    showDateAndOptions?: boolean;
    optionButtonHandler?: () => void;
}

const WeeklyStatisticsView = ({ data, showDateAndOptions = false, optionButtonHandler }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.hStack}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{'주간 통계'}</Text>
                    {showDateAndOptions && <Text style={styles.dateText}>{getCurrentWeek()}</Text>}
                </View>
                {showDateAndOptions && <TouchableOpacity onPress={optionButtonHandler}><OptionButton fill={'#FDB44F'} /></TouchableOpacity>}
            </View>
            <Spacer size={26} />
            <WeeklyProgressBar data={data} />
        </View>
    );
};

export default WeeklyStatisticsView;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    hStack: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#141210',
        lineHeight: 24,
    },
    dateText: {
        fontSize: 10,
        color: '#968C7E',
        lineHeight: 14,
    },

});
