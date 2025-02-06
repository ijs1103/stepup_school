import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavBar} from '@/shared/ui/NavBar';

const AchievementScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <NavBar title={''} titleColor={'#000'} backButtonIcon={'ArrowBackGray'} />
      <Text style={styles.label}>{'달성 업적'}</Text>
      {/* <BadgeList /> */}
      <Text style={styles.label}>{'달성 중'}</Text>
      {/* <AchievementList /> */}
    </ScrollView>
  );
};

export default AchievementScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 28,
    color: '#423836',
  },
});
