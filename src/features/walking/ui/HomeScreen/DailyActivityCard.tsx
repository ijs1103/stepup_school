import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MoreButton from '../../../../../assets/more_button.svg';
import { Spacer } from '@/shared/ui/Spacer';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { ActivityView } from '@/shared/ui/ActivityView';
import { ActivityStats } from '../../\bmodel/useDailyActivityStats';

interface Props {
    data: ActivityStats;
    targetStepCount: number;
    optionButtonHandler: () => void;
}

const DailyActivityCard = ({ data: { distance, burnedCalories, stepCount, walkingTime }, targetStepCount, optionButtonHandler }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.hStack}>
                <Text style={styles.currentStepText}>
                    {stepCount !== null ? stepCount.toLocaleString() : '0'}
                    <Text style={styles.targetStepText}>{`\n/${targetStepCount} 걸음`}</Text>
                </Text>
                <TouchableOpacity onPress={optionButtonHandler}>
                    <MoreButton />
                </TouchableOpacity>
            </View>
            <Spacer size={18} />
            <ProgressBar total={38252} now={100000} />
            <Spacer size={24} />
            <ActivityView data={{ calorie: burnedCalories, time: walkingTime, distance: distance }} iconColor={'#FB970C'} textColor={'#423D36'} />
        </View>
    );
};

export default DailyActivityCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEDFB3CC',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFF1DD',
        paddingHorizontal: 24,
        paddingVertical: 22,
    },
    hStack: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    currentStepText: {
        fontSize: 32,
        fontWeight: '500',
        color: '#141210',
    },
    targetStepText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#968C7E',
    },
});
