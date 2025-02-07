import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WBadge1 from '../../../../assets/w_badge_1.svg';
import WBadge2 from '../../../../assets/w_badge_2.svg';
import WBadge3 from '../../../../assets/w_badge_3.svg';
import WBadge4 from '../../../../assets/w_badge_4.svg';
import WBadge5 from '../../../../assets/w_badge_5.svg';
import WBadge6 from '../../../../assets/w_badge_6.svg';
import KBadge1 from '../../../../assets/k_badge_1.svg';
import KBadge2 from '../../../../assets/k_badge_2.svg';
import KBadge3 from '../../../../assets/k_badge_3.svg';
import KBadge4 from '../../../../assets/k_badge_4.svg';
import KBadge5 from '../../../../assets/k_badge_5.svg';
import KBadge6 from '../../../../assets/k_badge_6.svg';
import CBadge1 from '../../../../assets/c_badge_1.svg';
import CBadge2 from '../../../../assets/c_badge_2.svg';
import CBadge3 from '../../../../assets/c_badge_3.svg';
import CBadge4 from '../../../../assets/c_badge_4.svg';
import CBadge5 from '../../../../assets/c_badge_5.svg';
import CBadge6 from '../../../../assets/c_badge_6.svg';


interface Props {
    badge: Badge;
    date: string;
}

interface Badge {
    title: string;
    name: string;
}

type BadgeType = 'walk' | 'calorie' | 'distance' | 'challenge';

export const matchBadge = (stat: number, badgeType: BadgeType): Badge => {

};

const BadgeListItem = ({ badge, date }: Props) => {
    return (
        <View style={styles.container}>
            <WBadge1 />
        </View>
    );
}

export default BadgeListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
});

