import { useHomeStackNavigation } from '@/app/navigation/RootNavigation';
import { useAuthStore } from '@/entities/user/model/stores/useAuthStore';
import AccountOptionItem, { AccountOptionItemProps } from '@/features/setting/ui/AccountOptionItem';
import { NavBar } from '@/shared/ui/NavBar';
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

const AccountScreen = () => {
    const navigation = useHomeStackNavigation();
    const { logout } = useAuthStore();
    const accountOptionListData: AccountOptionItemProps[] = useMemo(
        () => [
            {
                title: '비밀번호 변경',
                pressHandler: () => navigation.navigate('PasswordChange'),
            },
            {
                title: '로그아웃',
                pressHandler: () => logout(),
            },
        ],
        [],
    );
    return (
        <View style={styles.container}>
            <NavBar title={'계정'} titleColor={'#000'} backButtonIcon={'ArrowBackGray'} />
            <View style={styles.accountOptionList}>
                {accountOptionListData.map(item => <AccountOptionItem key={item.title} {...item} />)}
            </View>
        </View>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    accountOptionList: {
        backgroundColor: '#F2F0EF',
        borderRadius: 20,
        marginHorizontal: 25,
        paddingHorizontal: 30,
        paddingVertical: 22,
        gap: 22,
    },
});
