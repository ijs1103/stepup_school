import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    title: string;
    subTitle: string;
}

export const SignupLabel = ({ title, subTitle }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 3,
    },
    title: {
        fontSize: 16,
        color: '#19181B',
    },
    subTitle: {
        fontSize: 10,
        color: '#807986'
    },
});
