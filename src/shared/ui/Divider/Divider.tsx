import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = () => {
    return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#D8D8D8',
    },
});

export default Divider;
