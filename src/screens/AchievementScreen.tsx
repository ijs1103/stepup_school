import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavBar } from '@/shared/ui/NavBar';

const AchievementScreen = () => {
  // 회원가입한 가입날짜 /user/me api에서도 필요
  // 챌린지 api 챌린지 완료한 valid가 not valid-step 항목만 filter
  // 1차기획안을 토대로는 뱃지를 발급한 날짜를 파악하는것이 불가능
  // 2차기획안을 토대로는 가능 
  // 걸음수 5만 => 뱃지 2개 
  // 걸음수 넣으면 뱃지객체({ title: string; badgeName: string }
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <NavBar title={'업적'} titleColor={'#000'} backButtonIcon={'ArrowBackGray'} />
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
    marginLeft: 16,
  },
});
