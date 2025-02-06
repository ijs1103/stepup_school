import React from 'react';
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import WelcomeScreen from '@/screens/WelcomeScreen';
import SignInScreen from '@/screens/SignInScreen';
import SignUpScreen from '@/screens/SignUpScreen';
import SchoolInfoScreen from '@/screens/SchoolInfoScreen';
import BodyInfoScreen from '@/screens/BodyInfoScreen';
import TermsAgreementScreen from '@/screens/TermsAgreementScreen';
import SignUpCompleteScreen from '@/screens/SignUpCompleteScreen';
import HomeScreen from '@/screens/HomeScreen';
import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import CustomTabBar from '@/shared/ui/CustomTabBar/CustomTabBar';
import PedometerSettingsScreen from '@/screens/PedometerSettingsScreen';
import RecordScreen from '@/screens/RecordScreen';
import MonthlyRecordScreen from '@/screens/MonthlyRecordScreen';
import CommunityScreen from '@/screens/CommunityScreen';
import WritingScreen from '@/screens/WritingScreen';
import FeedDetailScreen from '@/screens/FeedDetailScreen';
import WeeklyRecordScreen from '@/screens/WeeklyRecordScreen';
import MyClassWeeklyChartScreen from '@/screens/MyClassWeeklyChartScreen';
import RankingDetailScreen from '@/screens/RankingDetailScreen';
import ChallengeScreen from '@/screens/ChallengeScreen';
import ChallengeDetailScreen from '@/screens/ChallengeDetailScreen';
import ParticipationDetailsScreen from '@/screens/ParticipationDetailsScreen';
import {ParsedChallenge} from '@/features/\bchallenge/model/useChallengeList';
import SettingsMainScreen from '@/screens/SettingsMainScreen';
import AccountScreen from '@/screens/AccountScreen';
import PasswordChangeScreen from '@/screens/PasswordChangeScreen';
import PersonalInfoChangeScreen from '@/screens/PersonalInfoChangeScreen';
import BodyInfoChangeScreen from '@/screens/BodyInfoChangeScreen';
import AchievementScreen from '@/screens/AchievementScreen';

const Tab = createBottomTabNavigator();

type HomeStackParams = {
  Home: undefined;
  PedometerSettings: undefined;
  SettingsMain: undefined;
  Account: undefined;
  Notification: undefined;
  PasswordChange: undefined;
  PersonalInfoChange: undefined;
  BodyInfoChange: undefined;
  Achievement: undefined;
  AchievementDetail: undefined;
};

export const HomeStack = createNativeStackNavigator<HomeStackParams>();

const HomeStacks = () => (
  <HomeStack.Navigator
    initialRouteName={'Home'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <HomeStack.Screen name={'Home'} component={HomeScreen} />
    <HomeStack.Screen
      name={'PedometerSettings'}
      component={PedometerSettingsScreen}
    />
    <HomeStack.Screen name={'SettingsMain'} component={SettingsMainScreen} />
    <HomeStack.Screen name={'Account'} component={AccountScreen} />
    <HomeStack.Screen name={'Notification'} component={NotificationScreen} />
    <HomeStack.Screen
      name={'PasswordChange'}
      component={PasswordChangeScreen}
    />
    <HomeStack.Screen
      name={'PersonalInfoChange'}
      component={PersonalInfoChangeScreen}
    />
    <HomeStack.Screen
      name={'BodyInfoChange'}
      component={BodyInfoChangeScreen}
    />
    <HomeStack.Screen name={'Achievement'} component={AchievementScreen} />
    <HomeStack.Screen
      name={'AchievementDetail'}
      component={AchievementDetailScreen}
    />
  </HomeStack.Navigator>
);

export const useHomeStackNavigation = <
  RouteName extends keyof HomeStackParams,
>() => useNavigation<NativeStackNavigationProp<HomeStackParams, RouteName>>();

export const useHomeStackRoute = <RouteName extends keyof HomeStackParams>() =>
  useRoute<RouteProp<HomeStackParams, RouteName>>();

const NotificationScreen = () => {
  return <Text>Settings</Text>;
};

const AchievementDetailScreen = () => {
  return <Text>Settings</Text>;
};

type RecordStackParams = {
  Record: undefined;
  WeeklyRecord: undefined;
  MonthlyRecord: undefined;
};

export const RecordStack = createNativeStackNavigator<RecordStackParams>();

const RecordStacks = () => (
  <RecordStack.Navigator
    initialRouteName={'Record'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <RecordStack.Screen name={'Record'} component={RecordScreen} />
    <RecordStack.Screen name={'WeeklyRecord'} component={WeeklyRecordScreen} />
    <RecordStack.Screen
      name={'MonthlyRecord'}
      component={MonthlyRecordScreen}
    />
  </RecordStack.Navigator>
);

export const useRecordStackNavigation = <
  RouteName extends keyof RecordStackParams,
>() => useNavigation<NativeStackNavigationProp<RecordStackParams, RouteName>>();

export const useRecordStackRoute = <
  RouteName extends keyof RecordStackParams,
>() => useRoute<RouteProp<RecordStackParams, RouteName>>();

type MapStackParams = {
  Map: undefined;
  MyFootsteps: undefined;
};

export const MapStack = createNativeStackNavigator<MapStackParams>();

const MapStacks = () => (
  <MapStack.Navigator
    initialRouteName={'Map'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <MapStack.Screen name={'Map'} component={MapScreen} />
    <MapStack.Screen name={'MyFootsteps'} component={MyFootstepsScreen} />
  </MapStack.Navigator>
);

export const useMapStackNavigation = <
  RouteName extends keyof MapStackParams,
>() => useNavigation<NativeStackNavigationProp<MapStackParams, RouteName>>();

export const useMapStackRoute = <RouteName extends keyof MapStackParams>() =>
  useRoute<RouteProp<MapStackParams, RouteName>>();

const MapScreen = () => {
  return <Text>Home</Text>;
};

const MyFootstepsScreen = () => {
  return <Text>Profile</Text>;
};

type CommunityStackParams = {
  Community: undefined;
  MyClassWeeklyChart: undefined;
  RankingDetail: undefined;
  Writing: undefined;
  FeedDetail: {feedId: number};
};

export const CommunityStack =
  createNativeStackNavigator<CommunityStackParams>();

const CommunityStacks = () => (
  <CommunityStack.Navigator
    initialRouteName={'Community'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <CommunityStack.Screen name={'Community'} component={CommunityScreen} />
    <CommunityStack.Screen
      name={'MyClassWeeklyChart'}
      component={MyClassWeeklyChartScreen}
    />
    <CommunityStack.Screen
      name={'RankingDetail'}
      component={RankingDetailScreen}
    />
    <CommunityStack.Screen name={'Writing'} component={WritingScreen} />
    <CommunityStack.Screen name={'FeedDetail'} component={FeedDetailScreen} />
  </CommunityStack.Navigator>
);

export const useCommunityStackNavigation = <
  RouteName extends keyof CommunityStackParams,
>() =>
  useNavigation<NativeStackNavigationProp<CommunityStackParams, RouteName>>();

export const useCommunityStackRoute = <
  RouteName extends keyof CommunityStackParams,
>() => useRoute<RouteProp<CommunityStackParams, RouteName>>();

type ChallengeStackParams = {
  Challenge: undefined;
  ChallengeDetail: {challenge: ParsedChallenge};
  ParticipationDetails: undefined;
};

export const ChallengeStack =
  createNativeStackNavigator<ChallengeStackParams>();

const ChallengeStacks = () => (
  <ChallengeStack.Navigator
    initialRouteName={'Challenge'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <ChallengeStack.Screen name={'Challenge'} component={ChallengeScreen} />
    <ChallengeStack.Screen
      name={'ChallengeDetail'}
      component={ChallengeDetailScreen}
    />
    <ChallengeStack.Screen
      name={'ParticipationDetails'}
      component={ParticipationDetailsScreen}
    />
  </ChallengeStack.Navigator>
);

export const useChallengeStackNavigation = <
  RouteName extends keyof ChallengeStackParams,
>() =>
  useNavigation<NativeStackNavigationProp<ChallengeStackParams, RouteName>>();

export const useChallengeStackRoute = <
  RouteName extends keyof ChallengeStackParams,
>() => useRoute<RouteProp<ChallengeStackParams, RouteName>>();

const MainTabs = () => (
  <Tab.Navigator
    tabBar={({state, navigation}) => (
      <CustomTabBar state={state} navigation={navigation} />
    )}
    screenOptions={{headerShown: false}}>
    <Tab.Screen name={'HomeTab'} component={HomeStacks} />
    <Tab.Screen name={'RecordTab'} component={RecordStacks} />
    <Tab.Screen name={'MapTab'} component={MapStacks} />
    <Tab.Screen name={'CommunityTab'} component={CommunityStacks} />
    <Tab.Screen name={'ChallengeTab'} component={ChallengeStacks} />
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
};

export const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthStacks = () => (
  <AuthStack.Navigator
    initialRouteName={'Welcome'}
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <AuthStack.Screen name={'Welcome'} component={WelcomeScreen} />
    <AuthStack.Screen name={'SignIn'} component={SignInScreen} />
    <AuthStack.Screen name={'SignUp'} component={SignUpScreen} />
    <AuthStack.Screen name={'SchoolInfo'} component={SchoolInfoScreen} />
    <AuthStack.Screen name={'BodyInfo'} component={BodyInfoScreen} />
    <AuthStack.Screen
      name={'TermsAgreement'}
      component={TermsAgreementScreen}
    />
    <AuthStack.Screen
      name={'SignUpComplete'}
      component={SignUpCompleteScreen}
    />
  </AuthStack.Navigator>
);

export const useAuthStackNavigation = <
  RouteName extends keyof AuthStackParams,
>() => useNavigation<NativeStackNavigationProp<AuthStackParams, RouteName>>();

export const useAuthStackRoute = <RouteName extends keyof AuthStackParams>() =>
  useRoute<RouteProp<AuthStackParams, RouteName>>();

type RootStackParams = {
  AuthStacks: undefined;
  MainTabs: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export const useRootStackNavigation = <
  RouteName extends keyof RootStackParams,
>() => useNavigation<NativeStackNavigationProp<RootStackParams, RouteName>>();

const RootNavigation = () => {
  const {isLoggedIn} = useAuthStore();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <RootStack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <RootStack.Screen name="AuthStacks" component={AuthStacks} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
