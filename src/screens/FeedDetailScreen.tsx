import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingLayout} from '@/shared/ui/KeyboardAvoidingLayout';
import {NavBar} from '@/shared/ui/NavBar';
import Avatar from '@/shared/ui/Avatar/Avatar';
import ImageItem from '@/features/community/ui/WritingScreen/ImageItem';
import {Spacer} from '@/shared/ui/Spacer';
import CommentTableCell from '@/features/community/ui/FeedDetailScreen/CommentTableCell';
import ListEmptyComponent from '@/features/community/ui/CommunityScreen/ListEmptyComponent';
import {TouchableWithoutFeedback} from 'react-native';

const commentList = [{id: 1}, {id: 2}, {id: 3}];
const imageUrls = [
  'https://reactnative.dev/img/tiny_logo.png',
  'https://reactnative.dev/img/tiny_logo.png',
  'https://reactnative.dev/img/tiny_logo.png',
  'https://reactnative.dev/img/tiny_logo.png',
  'https://reactnative.dev/img/tiny_logo.png',
];

const FeedDetailScreen = () => {
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );

  const commentPressHandler = useCallback((commentId: number) => {
    //TODO: 댓글 입력창과 키보드가 같이 위로 떠야함. 댓글 입력창에 포커스되야함
    setSelectedCommentId(prevId => (prevId === commentId ? null : commentId));
  }, []);

  const setSelectedCommentIdToNull = useCallback(() => {
    setSelectedCommentId(null);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={setSelectedCommentIdToNull}>
      <View style={styles.container}>
        <NavBar backButtonIcon={'ArrowBackGray'} />
        <View style={styles.avatarContainer}>
          <Avatar />
          <View style={styles.vStack}>
            <Text style={styles.nameText}>{'김가네'}</Text>
            <Text style={styles.dateText}>{'11.13 10:43'}</Text>
          </View>
        </View>
        <View style={styles.contentsContainer}>
          <Text>
            {
              '오늘 목표 달성 완료. 사진 첨부합니다 ! 오늘 목표 달성 완료. 사진 첨부합니다 ! 오늘 목표 달성 완료. 사진 첨부합니다 ! 오늘 목표 달성 완료. 사진 첨부합니다 ! 오늘 목표 달성 완료. 사진 첨부합니다 !'
            }
          </Text>
          {imageUrls.length > 0 && (
            <FlatList
              style={{paddingLeft: 16, marginVertical: 32}}
              data={imageUrls}
              renderItem={({item}) => <ImageItem imageUrl={item} />}
              keyExtractor={(item, index) => `${index}`}
              ItemSeparatorComponent={() => <Spacer size={16} horizontal />}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          )}
        </View>
        <TouchableWithoutFeedback>
          <View style={styles.commentContainer}>
            <FlatList
              data={commentList}
              renderItem={({item}) => (
                <CommentTableCell
                  data={item.id}
                  isSelected={selectedCommentId === item.id}
                  commentPressHandler={() => commentPressHandler(item.id)}
                />
              )}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={
                <ListEmptyComponent
                  title={`아직 댓글이 없어요\n댓글을 남겨주세요`}
                />
              }
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <Spacer size={16} />}
              contentContainerStyle={{flexGrow: 1}}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FeedDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingLeft: 28,
  },
  vStack: {
    gap: 2,
  },
  nameText: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    color: '#423D36',
  },
  dateText: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 14,
    color: '#C7BBAB',
  },
  contentsContainer: {
    paddingTop: 18,
    paddingHorizontal: 28,
  },
  commentContainer: {
    flex: 1,
    backgroundColor: '#F2F0EF',
    paddingHorizontal: 8,
    paddingVertical: 18,
  },
});
