import {ProgressBar} from '@/shared/ui/ProgressBar';
import React from 'react';
import {View, StyleSheet, Pressable, Image, Text} from 'react-native';

interface Props {
  navigateToDetail: () => void;
  isDone?: boolean;
  imageUrl?: string;
}

const ChallengeListItem = ({navigateToDetail, isDone, imageUrl}: Props) => {
  return (
    <Pressable onPress={navigateToDetail} style={styles.container}>
      <View style={styles.hStack}>
        <Image
          source={{uri: imageUrl}}
          style={styles.image}
          resizeMode={'cover'}
        />
        <View style={styles.contentsContainer}>
          <View style={{gap: 6}}>
            <Text style={styles.title} numberOfLines={1}>
              {'(설정이름) 하루 만 보 챌린지'}
            </Text>
            <Text style={styles.date}>{'5시간 뒤 종료'}</Text>
          </View>
          <View style={{gap: 6}}>
            <Text style={styles.total}>
              <Text style={styles.achievementRate}>{'3,444'}</Text>
              {' / 10,000 걸음'}
            </Text>
            <ProgressBar total={3444} now={10000} />
          </View>
        </View>
      </View>
      {isDone && <View style={styles.overlay} />}
    </Pressable>
  );
};

export default ChallengeListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEDFB3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  overlay: {
    borderRadius: 20,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 196, 146, 0.6)',
    zIndex: 10,
  },
  hStack: {
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    overflow: 'hidden',
    borderRadius: 20,
    width: 90,
    height: 90,
    backgroundColor: '#D9D9D9',
  },
  contentsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  title: {
    fontWeight: '500',
    lineHeight: 17,
    color: '#141210',
  },
  date: {
    fontWeight: '500',
    lineHeight: 12,
    fontSize: 10,
    color: '#968C7E',
  },
  achievementRate: {
    fontWeight: '700',
    lineHeight: 14,
    fontSize: 12,
    color: '#141210',
  },
  total: {
    textAlign: 'right',
    fontWeight: '500',
    lineHeight: 14,
    fontSize: 12,
    color: '#968C7E',
  },
});
