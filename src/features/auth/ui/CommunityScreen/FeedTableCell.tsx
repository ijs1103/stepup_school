import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import Avatar from '@/shared/ui/Avatar/Avatar';
import {Spacer} from '@/shared/ui/Spacer';

interface Props {
  feedPressHandler: () => void;
  source?: ImageSourcePropType | undefined;
}

const FeedTableCell = ({feedPressHandler, source}: Props) => {
  return (
    <Pressable onPress={feedPressHandler}>
      <View style={styles.container}>
        <View style={styles.hStack}>
          <View style={styles.avatarContainer}>
            <Avatar small />
            <Text style={styles.nameText}>{'김가네'}</Text>
          </View>
          <Text style={styles.timeText}>{'10.11 14:13'}</Text>
        </View>
        <Spacer size={8} />
        <View style={styles.contentsContainer}>
          <Text style={styles.contentsText}>
            {
              '오늘 목표 달성 완료 ! (내용) 오늘 목표 달성 완료 ! (내용) 오늘 목표 달성 완료 ! (내용)'
            }
          </Text>
          <Spacer size={22} />
          <Image source={source} style={styles.image} />
        </View>
      </View>
    </Pressable>
  );
};

export default FeedTableCell;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  hStack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nameText: {
    fontWeight: '700',
    lineHeight: 20,
    color: '#423D36',
  },
  timeText: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
    color: '#96867E',
  },
  contentsContainer: {
    paddingLeft: 50,
    paddingRight: 16,
    paddingBottom: 28,
  },
  contentsText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
    color: '#423D36',
  },
  image: {
    width: 90,
    height: 90,
    backgroundColor: '#D9D9D9',
  },
});
