import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowBackWhite from '../../../../assets/arrow_back.svg';
import ArrowBackGray from '../../../../assets/arrow_back_gray.svg';
import ChevronBack from '../../../../assets/arrow_back.svg';

interface INavBar {
    title?: string;
    backButtonIcon: 'ArrowBackWhite' | 'ArrowBackGray' | 'ChevronBack';
    leftTitle?: string;
    rightItem?: React.ReactNode;
}

const NavBar = ({ title, backButtonIcon, leftTitle, rightItem }: INavBar) => {
    const { goBack, canGoBack } = useNavigation();
    const goBackHandler = useCallback(() => {
        goBack();
    }, [goBack]);

    return (
        <View style={styles.header}>
            <View style={styles.left}>
                {canGoBack() && <TouchableOpacity onPress={goBackHandler}>
                    {backButtonIcon === 'ArrowBackGray' && <ArrowBackGray />}
                    {backButtonIcon === 'ArrowBackWhite' && <ArrowBackWhite />}
                    {backButtonIcon === 'ChevronBack' && <ChevronBack />}
                </TouchableOpacity>}
                {leftTitle && <Text style={styles.leftTitle}>leftTitle</Text>
                }
            </View>
            <View style={styles.center}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            {rightItem && <View style={styles.right}>
                <View style={styles.rightItem}>
                    {rightItem}
                </View>
            </View>}
        </View>
    );
}

export default NavBar;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
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
        flex: 3,
        justifyContent: 'center',
    },
    title: {
        color: '#59555e',
    },
    right: {
        flex: 1,
    },
    rightItem: {

    },
});
