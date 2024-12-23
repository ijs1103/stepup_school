import React from 'react';
import { View, Text } from 'react-native';
import SmileLogo from '../../assets/smile_logo.svg'
import { Spacer } from '@/shared/ui/Spacer';

const WelcomeScreen = () => {
  return (
    <View>
      <Text>{'스텝업 스쿨에\n오신것을 환영해요!'}</Text>
      <Spacer size={36} />
      <SmileLogo width={177} height={177} />
    </View>
  );
}

export default WelcomeScreen;

