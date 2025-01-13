import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
    title: string;
    info?: string | number;
    pressHandler: () => void;
}

const InfoInputButton = ({ title, info, pressHandler }: Props) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                info ? styles.selectedButton : styles.defaultButton,
            ]}
            onPress={pressHandler}
        >
            <View style={styles.textContainer}>
                <Text style={styles.text}>{title}</Text>
                {info && <Text style={styles.rightText}>{info}</Text>}
            </View>
        </TouchableOpacity>
    );
};

export default InfoInputButton;

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 8,
    },
    defaultButton: {
        backgroundColor: '#F2F0EF',
    },
    selectedButton: {
        backgroundColor: '#FDCA81',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    rightText: {
        fontSize: 16,
        color: '#E38503',
    },
});
