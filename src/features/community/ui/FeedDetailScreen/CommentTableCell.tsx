import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Avatar from '@/shared/ui/Avatar/Avatar';
import {Spacer} from '@/shared/ui/Spacer';
import {Comment} from '../../model/useFeedDetail';
import {formatFeedDate} from '@/shared/lib/date/formatFeedDate';
import CommentLinker from '../../../../../assets/comment_linker.svg';

interface Props {
  data: Comment;
  isSelected: boolean;
  commentPressHandler: (commentId: number) => void;
}

const CommentTableCell = ({data, isSelected, commentPressHandler}: Props) => {
  return (
    <TouchableOpacity onPress={() => commentPressHandler(data.id)}>
      <View
        style={[
          styles.container,
          {backgroundColor: isSelected ? '#FEDFB3' : '#fff'},
        ]}>
        <View style={styles.hStack}>
          <View style={styles.avatarContainer}>
            <Avatar imageUrl={data.user.profile_img} small />
            <Text style={styles.nameText}>{data.user.nickname}</Text>
          </View>
          <Text style={styles.timeText}>{formatFeedDate(data.create_at)}</Text>
        </View>
        <Spacer size={8} />
        <View style={styles.contentsContainer}>
          <Text style={styles.contentsText}>{data.content}</Text>
        </View>
        <View style={styles.repliesContainer}>
          {data.replies.length > 0 &&
            data.replies.map(item => (
              <View
                key={`${item.user.nickname}-${item.create_at}`}
                style={styles.replyContainer}>
                <CommentLinker />
                <View style={styles.replyContentsContainer}>
                  <View style={styles.hStack}>
                    <View style={styles.avatarContainer}>
                      <Avatar imageUrl={item.user.profile_img} small />
                      <Text style={styles.nameText}>{item.user.nickname}</Text>
                    </View>
                    <Text style={styles.timeText}>
                      {formatFeedDate(item.create_at)}
                    </Text>
                  </View>
                  <Spacer size={8} />
                  <View style={styles.contentsContainer}>
                    <Text style={styles.contentsText}>{item.content}</Text>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommentTableCell;

const styles = StyleSheet.create({
  container: {
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
  repliesContainer: {
    gap: 4,
  },
  replyContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  replyContentsContainer: {
    flex: 1,
    paddingTop: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
});
