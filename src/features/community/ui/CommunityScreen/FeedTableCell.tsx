import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import Avatar from '@/shared/ui/Avatar/Avatar';
import { Spacer } from '@/shared/ui/Spacer';
import { ParsedFeed } from '../../model/useFeedList';

interface Props {
  data: ParsedFeed;
  feedPressHandler: () => void;
}

const FeedTableCell = ({ data, feedPressHandler }: Props) => {
  return (
    <Pressable onPress={feedPressHandler}>
      <View style={styles.container}>
        <View style={styles.hStack}>
          <View style={styles.avatarContainer}>
            <Avatar source={{ uri: data.avatarUrl }} small />
            <Text style={styles.nameText}>{data.userName}</Text>
          </View>
          <Text style={styles.timeText}>{data.createdAt}</Text>
        </View>
        <Spacer size={8} />
        <View style={styles.contentsContainer}>
          <Text style={styles.contentsText}>
            {data.contents}
          </Text>
          <Spacer size={22} />
          {data.imageUrls.length > 0 && <Image source={{ uri: data.imageUrls.at(0) }} style={styles.image} />}
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
