import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {NavBar} from '@/shared/ui/NavBar';
import {Spacer} from '@/shared/ui/Spacer';
import ChallengeLabelStat from '@/features/\bchallenge/ui/ChallengeDetailScreen/ChallengeLabelStat';
import {ProgressBar} from '@/shared/ui/ProgressBar';

const ChallengeDetailScreen = () => {
  return (
    <View style={styles.container}>
      <NavBar
        title={'챌린지'}
        titleColor="#423836"
        backButtonIcon={'ArrowBackGray'}
      />
      <Image
        style={styles.image}
        source={{uri: undefined}}
        resizeMode={'cover'}
      />
      <View style={styles.contentsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>{'걸음수 달성'}</Text>
          <Text style={styles.title}>{'하루만보 챌린지'}</Text>
        </View>
        <Spacer size={10} />
        <View style={styles.cardContainer}>
          <ChallengeLabelStat
            label={'챌린지 기간'}
            stat={'2024.11.11 ~ 11.12'}
          />
          <ChallengeLabelStat label={'목표 걸음'} stat={'10000'} />
          <ChallengeLabelStat
            label={'나의 걸음수'}
            stat={'3,444'}
            isEmphaszied
          />
          <ChallengeLabelStat
            label={'전체 걸음수'}
            stat={'15,000'}
            isEmphaszied
          />
          <View style={styles.progressBarContainer}>
            <ProgressBar total={3444} now={15000} outerColor={'#F2F0EF'} />
            <Text style={styles.totalStat}>
              <Text style={styles.currentStat}>{'3,444'}</Text>
              {' / 10,000 걸음'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChallengeDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    height: 320,
    width: '100%',
    backgroundColor: '#D9D9D9',
  },
  titleContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 16,
    paddingBottom: 12,
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 24,
    color: '#96867E',
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    color: '#423836',
  },
  contentsContainer: {
    backgroundColor: '#F2F0EF',
  },
  cardContainer: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 30,
  },
  progressBarContainer: {
    paddingTop: 12,
    gap: 10,
  },
  currentStat: {
    fontWeight: '700',
    lineHeight: 14,
    fontSize: 12,
    color: '#141210',
  },
  totalStat: {
    textAlign: 'left',
    fontWeight: '500',
    lineHeight: 14,
    fontSize: 12,
    color: '#968C7E',
  },
});
