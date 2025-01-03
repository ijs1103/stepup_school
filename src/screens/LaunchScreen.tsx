import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useAuthStackNavigation, useHomeStackNavigation } from '@/app/navigation/RootNavigation';

const LaunchScreen = () => {
    const authNavigation = useAuthStackNavigation();
    const homeNavigation = useHomeStackNavigation();
    const [isLoggedIn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (isLoggedIn) {
                homeNavigation.navigate('Home');
            } else {
                authNavigation.navigate('Welcome');
            }
        }, 1000);
    }, [authNavigation, homeNavigation, isLoggedIn]);
    return (
        <View style={styles.container}>
            <Image style={styles.image} resizeMode="cover" source={require('../../assets/launch_screen.png')} />
        </View>
    );
};

export default LaunchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
