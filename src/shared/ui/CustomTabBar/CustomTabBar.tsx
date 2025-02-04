import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import HomeIconSelected from '../../../../assets/tab_home_selected.svg';
import HomeIconUnselected from '../../../../assets/tab_home_unselected.svg';
import RecordIconSelected from '../../../../assets/tab_record_selected.svg';
import RecordIconUnselected from '../../../../assets/tab_record_unselected.svg';
import CenterIcon from '../../../../assets/tab_center.svg';
import CommunityIconSelected from '../../../../assets/tab_community_selected.svg';
import CommunityIconUnselected from '../../../../assets/tab_community_unselected.svg';
import DonationIconSelected from '../../../../assets/tab_donation_selected.svg';
import DonationIconUnselected from '../../../../assets/tab_donation_unselected.svg';
import {
  getFocusedRouteNameFromRoute,
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';

interface Props {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

const CustomTabBar = ({ state, navigation }: Props) => {
  const route = state.routes[state.index];
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  if (['Writing', 'FeedDetail', 'WeeklyRecord', 'MonthlyRecord', 'MyClassWeeklyChart', 'RankingDetail', 'PasswordChange', 'PersonalInfoChange'].includes(routeName)) {
    return null;
  }

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('HomeTab')}>
        {state.index === 0 ? <HomeIconSelected /> : <HomeIconUnselected />}
        <Text style={styles.tabText}>홈</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('RecordTab')}>
        {state.index === 1 ? <RecordIconSelected /> : <RecordIconUnselected />}
        <Text style={styles.tabText}>기록</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => navigation.navigate('MapTab')}>
        <View style={styles.centerButtonInner}>
          <CenterIcon />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('CommunityTab')}>
        {state.index === 3 ? (
          <CommunityIconSelected />
        ) : (
          <CommunityIconUnselected />
        )}
        <Text style={styles.tabText}>커뮤니티</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('ChallengeTab')}>
        {state.index === 4 ? (
          <DonationIconSelected />
        ) : (
          <DonationIconUnselected />
        )}
        <Text style={styles.tabText}>챌린지</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 68,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tabItem: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#423D36',
  },
  centerButton: {
    flex: 1,
    alignItems: 'center',
  },
  centerButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -54,
    borderWidth: 6,
    borderColor: '#fff',
  },
});
