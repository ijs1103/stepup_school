import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SmileLogo from '../../assets/smile_logo.svg';
import {Spacer} from '@/shared/ui/Spacer';
import {CustomButton} from '@/shared/ui/CustomButton';
import {useAuthStackNavigation} from '@/app/navigation/RootNavigation';

const WelcomeScreen = () => {
  const navigation = useAuthStackNavigation();

  const signinHandler = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const signupHandler = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.topcontainer}>
          <Text style={styles.title}>
            {'스텝업 스쿨에\n오신것을 환영해요!'}
          </Text>
          <Spacer size={36} />
          <SmileLogo width={177} height={177} />
        </View>
        <View>
          <Text style={styles.label}>{'이미 계정을 만들었다면'}</Text>
          <Spacer size={3} />
          <CustomButton
            title={'로그인하기'}
            textColor={'#FDB44F'}
            backgroundColor={'#fff'}
            borderColor={'#FDB44F'}
            clickHandler={signinHandler}
          />
          <Spacer size={13} />
          <Text style={styles.label}>{'아래 버튼을 눌러 시작해 보세요!'}</Text>
          <Spacer size={3} />
          <CustomButton
            title={'스텝업 스쿨 시작하기'}
            textColor={'#fff'}
            backgroundColor={'#FB970C'}
            clickHandler={signupHandler}
          />
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  subcontainer: {
    paddingTop: 90,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topcontainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#423836',
    textAlign: 'center',
    lineHeight: 30,
  },
  label: {
    fontSize: 12,
    color: '#19181B',
    fontWeight: '200',
    textAlign: 'center',
  },
});
