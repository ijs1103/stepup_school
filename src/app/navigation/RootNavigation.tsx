import React, { useState } from 'react';
import { NavigationContainer, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import WelcomeScreen from '@/screens/WelcomeScreen';
import LaunchScreen from '@/screens/LaunchScreen';
import SignInScreen from '@/screens/SignInScreen';
import SignUpScreen from '@/screens/SignUpScreen';
import SchoolInfoScreen from '@/screens/SchoolInfoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Text>Home</Text>
  );
};

const ProfileScreen = () => {
  return (
    <Text>Profile</Text>
  );
};

const SettingsScreen = () => {
  return (
    <Text>Settings</Text>
  );
};

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

type AuthStackParams = {
  Launch: undefined;
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SchoolInfo: undefined;
}

export const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthStackScreen = () => (
  <Stack.Navigator initialRouteName={'Launch'}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Launch" component={LaunchScreen} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="SchoolInfo" component={SchoolInfoScreen} />
  </Stack.Navigator>
);

export const useAuthStackNavigation = <RouteName extends keyof AuthStackParams>() =>
  useNavigation<NativeStackNavigationProp<AuthStackParams, RouteName>>();

export const useAuthStackRoute = <RouteName extends keyof AuthStackParams>() =>
  useRoute<RouteProp<AuthStackParams, RouteName>>();

const RootNavigation = () => {
  const [isLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStackScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;