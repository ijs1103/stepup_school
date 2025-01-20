import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
    title: string;
    color: string;
    pressHandler: () => void;
}

const ActivityStatButton = ({ title, color, pressHandler }: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={pressHandler}>
            <Text style={[styles.title, { color }]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ActivityStatButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 20,
    },
    title: {
        color: 'transparent',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16,
    },
});

