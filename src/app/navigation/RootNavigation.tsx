import React, { useState } from 'react';
import { NavigationContainer, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import WelcomeScreen from '@/screens/WelcomeScreen';
import SignInScreen from '@/screens/SignInScreen';
import SignUpScreen from '@/screens/SignUpScreen';
import SchoolInfoScreen from '@/screens/SchoolInfoScreen';
import BodyInfoScreen from '@/screens/BodyInfoScreen';
import TermsAgreementScreen from '@/screens/TermsAgreementScreen';
import SignUpCompleteScreen from '@/screens/SignUpCompleteScreen';
import HomeScreen from '@/screens/HomeScreen';

const Tab = createBottomTabNavigator();

type HomeStackParams = {
  Home: undefined;
  PedometerSettings: undefined;
  SettingsMain: undefined;
  Account: undefined;
  Notification: undefined;
  PersonalInfoChange: undefined;
  Achievement: undefined;
  AchievementDetail: undefined;
}

export const HomeStack = createNativeStackNavigator<HomeStackParams>();

const HomeStacks = () => (
  <HomeStack.Navigator initialRouteName={'Home'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <HomeStack.Screen name={'Home'} component={HomeScreen} />
    <HomeStack.Screen name={'PedometerSettings'} component={PedometerSettingsScreen} />
    <HomeStack.Screen name={'SettingsMain'} component={SettingsMainScreen} />
    <HomeStack.Screen name={'Account'} component={AccountScreen} />
    <HomeStack.Screen name={'Notification'} component={NotificationScreen} />
    <HomeStack.Screen name={'PersonalInfoChange'} component={PersonalInfoChangeScreen} />
    <HomeStack.Screen name={'Achievement'} component={AchievementScreen} />
    <HomeStack.Screen name={'AchievementDetail'} component={AchievementDetailScreen} />
  </HomeStack.Navigator>
);

export const useHomeStackNavigation = <RouteName extends keyof HomeStackParams>() =>
  useNavigation<NativeStackNavigationProp<HomeStackParams, RouteName>>();

export const useHomeStackRoute = <RouteName extends keyof HomeStackParams>() =>
  useRoute<RouteProp<HomeStackParams, RouteName>>();

const PedometerSettingsScreen = () => {
  return (
    <Text>Profile</Text>
  );
};

const SettingsMainScreen = () => {
  return (
    <Text>Settings</Text>
  );
};

const AccountScreen = () => {
  return (
    <Text>Settings</Text>
  );
};

const NotificationScreen = () => {
  return (
    <Text>Settings</Text>
  );
};

const PersonalInfoChangeScreen = () => {
  return (
    <Text>Settings</Text>
  );
};

const AchievementScreen = () => {
  return (
    <Text>Settings</Text>
  );
};

const AchievementDetailScreen = () => {
  return (
    <Text>Settings</Text>
  );
};

type RecordStackParams = {
  Record: undefined;
  WeeklyRecord: undefined;
  MonthlyRecord: undefined;
}

export const RecordStack = createNativeStackNavigator<RecordStackParams>();

const RecordStacks = () => (
  <RecordStack.Navigator initialRouteName={'Record'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <RecordStack.Screen name={'Record'} component={RecordScreen} />
    <RecordStack.Screen name={'WeeklyRecord'} component={WeeklyRecordScreen} />
    <RecordStack.Screen name={'MonthlyRecord'} component={MonthlyRecordScreen} />
  </RecordStack.Navigator>
);

export const useRecordStackNavigation = <RouteName extends keyof RecordStackParams>() =>
  useNavigation<NativeStackNavigationProp<RecordStackParams, RouteName>>();

export const useRecordStackRoute = <RouteName extends keyof RecordStackParams>() =>
  useRoute<RouteProp<RecordStackParams, RouteName>>();

const RecordScreen = () => {
  return (
    <Text>Home</Text>
  );
};

const WeeklyRecordScreen = () => {
  return (
    <Text>Profile</Text>
  );
};

const MonthlyRecordScreen = () => {
  return (
    <Text>Settings</Text>
  );
};

type MapStackParams = {
  Map: undefined;
  MyFootsteps: undefined;
}

export const MapStack = createNativeStackNavigator<MapStackParams>();

const MapStacks = () => (
  <MapStack.Navigator initialRouteName={'Map'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <MapStack.Screen name={'Map'} component={MapScreen} />
    <MapStack.Screen name={'MyFootsteps'} component={MyFootstepsScreen} />
  </MapStack.Navigator>
);

export const useMapStackNavigation = <RouteName extends keyof MapStackParams>() =>
  useNavigation<NativeStackNavigationProp<MapStackParams, RouteName>>();

export const useMapStackRoute = <RouteName extends keyof MapStackParams>() =>
  useRoute<RouteProp<MapStackParams, RouteName>>();

const MapScreen = () => {
  return (
    <Text>Home</Text>
  );
};

const MyFootstepsScreen = () => {
  return (
    <Text>Profile</Text>
  );
};

type CommunityStackParams = {
  Community: undefined;
  MyClass: undefined;
  RankingDetail: undefined;
  Writing: undefined;
  FeedDetail: undefined;
}

export const CommunityStack = createNativeStackNavigator<CommunityStackParams>();

const CommunityStacks = () => (
  <CommunityStack.Navigator initialRouteName={'Community'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <CommunityStack.Screen name={'Community'} component={CommunityScreen} />
    <CommunityStack.Screen name={'MyClass'} component={MyClassScreen} />
    <CommunityStack.Screen name={'RankingDetail'} component={RankingDetailScreen} />
    <CommunityStack.Screen name={'Writing'} component={WritingScreen} />
    <CommunityStack.Screen name={'FeedDetail'} component={FeedDetailScreen} />
  </CommunityStack.Navigator>
);

export const useCommunityStackNavigation = <RouteName extends keyof CommunityStackParams>() =>
  useNavigation<NativeStackNavigationProp<CommunityStackParams, RouteName>>();

export const useCommunityStackRoute = <RouteName extends keyof CommunityStackParams>() =>
  useRoute<RouteProp<CommunityStackParams, RouteName>>();

const CommunityScreen = () => {
  return (
    <Text>Home</Text>
  );
};

const MyClassScreen = () => {
  return (
    <Text>Profile</Text>
  );
};

const RankingDetailScreen = () => {
  return (
    <Text>Profile</Text>
  );
};

const WritingScreen = () => {
  return (
    <Text>Profile</Text>
  );
};

const FeedDetailScreen = () => {
  return (
    <Text>Profile</Text>
  );
};

type DonationStackParams = {
  Challenge: undefined;
  ChallengeDetail: undefined;
}

export const DonationStack = createNativeStackNavigator<DonationStackParams>();

const DonationStacks = () => (
  <DonationStack.Navigator initialRouteName={'Challenge'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <DonationStack.Screen name={'Challenge'} component={ChallengeScreen} />
    <DonationStack.Screen name={'ChallengeDetail'} component={ChallengeDetailScreen} />
  </DonationStack.Navigator>
);

export const useDonationStackNavigation = <RouteName extends keyof DonationStackParams>() =>
  useNavigation<NativeStackNavigationProp<DonationStackParams, RouteName>>();

export const useDonationStackRoute = <RouteName extends keyof DonationStackParams>() =>
  useRoute<RouteProp<DonationStackParams, RouteName>>();

const ChallengeScreen = () => {
  return (
    <Text>Home</Text>
  );
};

const ChallengeDetailScreen = () => {
  return (
    <Text>Profile</Text>
  );
};

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name={'HomeTab'} component={HomeStacks} />
    <Tab.Screen name={'RecordTab'} component={RecordStacks} />
    <Tab.Screen name={'MapTab'} component={MapStacks} />
    <Tab.Screen name={'CommunityTab'} component={CommunityStacks} />
    <Tab.Screen name={'DonationTab'} component={DonationStacks} />
  </Tab.Navigator>
);

type AuthStackParams = {
  Launch: undefined;
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SchoolInfo: undefined;
  BodyInfo: undefined;
  TermsAgreement: undefined;
  SignUpComplete: undefined;
}

export const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthStacks = () => (
  <AuthStack.Navigator initialRouteName={'Welcome'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <AuthStack.Screen name={'Welcome'} component={WelcomeScreen} />
    <AuthStack.Screen name={'SignIn'} component={SignInScreen} />
    <AuthStack.Screen name={'SignUp'} component={SignUpScreen} />
    <AuthStack.Screen name={'SchoolInfo'} component={SchoolInfoScreen} />
    <AuthStack.Screen name={'BodyInfo'} component={BodyInfoScreen} />
    <AuthStack.Screen name={'TermsAgreement'} component={TermsAgreementScreen} />
    <AuthStack.Screen name={'SignUpComplete'} component={SignUpCompleteScreen} />
  </AuthStack.Navigator>
);

export const useAuthStackNavigation = <RouteName extends keyof AuthStackParams>() =>
  useNavigation<NativeStackNavigationProp<AuthStackParams, RouteName>>();

export const useAuthStackRoute = <RouteName extends keyof AuthStackParams>() =>
  useRoute<RouteProp<AuthStackParams, RouteName>>();

const RootNavigation = () => {
  const [isLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthStacks />}
    </NavigationContainer>
  );
};

export default RootNavigation;
