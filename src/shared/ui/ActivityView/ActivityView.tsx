import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FireIcon from '../../../../assets/fire.svg';
import ClockIcon from '../../../../assets/clock.svg';
import RulerIcon from '../../../../assets/ruler.svg';

interface ActivityViewData {
    calorie: number;
    time: number;
    distance: number;
}

interface Props {
    data: ActivityViewData;
    iconColor: string;
    textColor: string;
}

const ActivityView = ({ data: { calorie, time, distance }, iconColor, textColor }: Props) => {
    const formatNumber = (num: number | undefined | null) => {
        return num != null ? num.toLocaleString() : '0';
    };

    return (
        <View style={styles.container}>
            <View style={styles.vStack}>
                <View style={styles.hStack}>
                    <FireIcon fill={iconColor} />
                    <Text style={[styles.data, { color: iconColor }]}>
                        {formatNumber(calorie)}
                    </Text>
                </View>
                <Text style={[styles.label, { color: textColor }]}>소모 칼로리</Text>
            </View>
            <View style={styles.vStack}>
                <View style={styles.hStack}>
                    <ClockIcon fill={iconColor} />
                    <Text style={[styles.data, { color: iconColor }]}>
                        {`${formatNumber(time)}분`}
                    </Text>
                </View>
                <Text style={[styles.label, { color: textColor }]}>보행 시간</Text>
            </View>
            <View style={styles.vStack}>
                <View style={styles.hStack}>
                    <RulerIcon fill={iconColor} />
                    <Text style={[styles.data, { color: iconColor }]}>
                        {`${formatNumber(distance)}km`}
                    </Text>
                </View>
                <Text style={[styles.label, { color: textColor }]}>보행 거리</Text>
            </View>
        </View>
    );
};

export default ActivityView;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    vStack: {
        gap: 6,
        justifyContent: 'space-between',
    },
    hStack: {
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
    },
    data: {
        fontSize: 16,
        fontWeight: '500',
    },
    label: {
        fontSize: 10,
        fontWeight: '500',
    },
});
