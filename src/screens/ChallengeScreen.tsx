import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChallengeLogo from '../../assets/challenge_logo.svg';
import OptionButton from '../../assets/option_button.svg';
import ChallengeListItem from '@/features/\bchallenge/ui/ChallengeScreen/ChallengeListItem';

const ChallengeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <View style={styles.hStack}>
                    <ChallengeLogo />
                    <Text style={styles.title}>{'챌린지'}</Text>
                </View>
                <OptionButton fill={'#FB970C'} />
            </View>
            <ChallengeListItem isDone />
        </View>
    );
}

export default ChallengeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 28,
        paddingRight: 16,
        paddingTop: 26,
        paddingBottom: 16,
    },
    hStack: {
        flexDirection: 'row',
        gap: 12,
    },
    title: {
        fontWeight: '700',
        fontSize: 18,
        color: '#423D36',
    },
});

