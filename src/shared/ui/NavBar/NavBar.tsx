import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackWhite from '../../../../assets/arrow_back.svg';
import ArrowBackGray from '../../../../assets/arrow_back_gray.svg';
import ChevronBack from '../../../../assets/arrow_back.svg';

interface INavBar {
    title?: string;
    titleColor?: string;
    backButtonIcon: 'ArrowBackWhite' | 'ArrowBackGray' | 'ChevronBack';
    leftTitle?: string;
    rightItem?: React.ReactNode;
}

const NavBar = ({ title, titleColor = '#fff', backButtonIcon, leftTitle, rightItem }: INavBar) => {
    const { goBack, canGoBack } = useNavigation();
    const goBackHandler = useCallback(() => {
        goBack();
    }, [goBack]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <View style={styles.left}>
                    {canGoBack() && <TouchableOpacity onPress={goBackHandler}>
                        {backButtonIcon === 'ArrowBackGray' && <ArrowBackGray />}
                        {backButtonIcon === 'ArrowBackWhite' && <ArrowBackWhite />}
                        {backButtonIcon === 'ChevronBack' && <ChevronBack />}
                    </TouchableOpacity>}
                    {leftTitle && <Text style={styles.leftTitle}>leftTitle</Text>}
                </View>
                <View style={styles.center}>
                    <Text numberOfLines={1} style={[styles.title, { color: titleColor }]}>
                        {title}
                    </Text>
                </View>
                <View style={styles.right}>
                    <View>
                        {rightItem}
                    </View>
                </View>
            </View>
        </View>
    );
}

export default NavBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    left: {
        flex: 1,
        justifyContent: 'center',
    },
    leftTitle: {
        color: '#fff',
        fontSize: 20,
    },
    center: {
        flex: 2,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 28,
        textAlign: 'center',
        flexShrink: 1,
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
    },
});
