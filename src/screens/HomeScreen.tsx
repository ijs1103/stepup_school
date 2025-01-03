import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import usePermissions from '@/shared/lib/hooks/usePermissions';

const HomeScreen = () => {
    const permissions = usePermissions();

    return (
        <View style={styles.container}>
            <Text>Location Always: {permissions.locationAlways}</Text>
            <Text>Notifications: {permissions.notifications}</Text>
            <Text>Photo Library: {permissions.photoLibrary}</Text>
        </View >
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
