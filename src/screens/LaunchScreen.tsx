import React, { useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CustomButton } from '@/shared/ui/CustomButton';
import { useColors } from '@/shared/lib/useColors';
import { useAuthStackNavigation } from '@/app/navigation/RootNavigation';

const LaunchScreen = () => {
    const { white, main_500 } = useColors();
    const navigation = useAuthStackNavigation();
    const clickHandler = useCallback(() => {
        navigation.navigate('Welcome');
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image style={styles.image} resizeMode="cover" source={require('../../assets/launch_screen.png')} />
            <View style={styles.buttonContainer}>
                <CustomButton title="시작하기" textColor={main_500} backgroundColor={white} clickHandler={clickHandler} />
            </View>
        </View>
    );
}

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
    buttonContainer: {
        position: 'absolute',
        right: 0,
        bottom: 20,
        left: 0,
        alignItems: 'center',
    },
});
