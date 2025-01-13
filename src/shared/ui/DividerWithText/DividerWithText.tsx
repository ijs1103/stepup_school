import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DividerWithText = ({ text }: { text: string }) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>{text}</Text>
            <View style={styles.line} />
        </View>
    );
};

export default DividerWithText;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#968C7E',
    },
    text: {
        paddingHorizontal: 10,
        color: '#968C7E',
        fontSize: 14,
    },
});
