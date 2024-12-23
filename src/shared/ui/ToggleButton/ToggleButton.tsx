import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

interface IToggleButton {
    isToggled: boolean;
    pressHandler: () => {};
}

const ToggleButton = ({ isToggled, pressHandler }: IToggleButton) => {
    return (
        <TouchableOpacity onPress={pressHandler} style={styles.button}>
            <View style={[
                styles.toggle,
                { backgroundColor: isToggled ? '#4cd137' : '#718093' }
            ]} />
        </TouchableOpacity>
    );
};

export default ToggleButton;

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        padding: 2,
    },
    toggle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        transform: [{ translateX: 0 }],
    },
});

