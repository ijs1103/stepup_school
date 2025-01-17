import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

interface Props {
    activeTab: TabType;
    firstTabPressHandler: () => void;
    secondTabPressHandler: () => void;
}

export type TabType = '요약' | '피드';

const TabMenu = ({ activeTab, firstTabPressHandler, secondTabPressHandler }: Props) => {
  return (
    <View style={styles.tabMenuContainer}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={firstTabPressHandler}>
        <Text style={styles.tabText}>요약</Text>
        {activeTab === '요약' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={secondTabPressHandler}>
        <Text style={styles.tabText}>피드</Text>
        {activeTab === '피드' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

export default TabMenu;

const styles = StyleSheet.create({
  tabMenuContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: 8,
    paddingLeft: 16,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
  },
  tabText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: '#423D36',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#FFA000',
  },
});
