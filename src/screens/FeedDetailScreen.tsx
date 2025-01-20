import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { NavBar } from '@/shared/ui/NavBar';
import Avatar from '@/shared/ui/Avatar/Avatar';
import ImageItem from '@/features/community/ui/WritingScreen/ImageItem';
import { Spacer } from '@/shared/ui/Spacer';
import CommentTableCell from '@/features/community/ui/FeedDetailScreen/CommentTableCell';
import ListEmptyComponent from '@/features/community/ui/CommunityScreen/ListEmptyComponent';
import { TouchableWithoutFeedback } from 'react-native';
import WriteCommtentButton from '../../assets/write_comment_button.svg';

const commentList = [{ id: 1 }, { id: 2 }, { id: 3 }];
const imageUrls = [
  'https://reactnative.dev/img/tiny_logo.png',
  'https://reactnative.dev/img/tiny_logo.png',
  'https://reactnative.dev/img/tiny_logo.png',
  'https://reactnative.dev/img/tiny_logo.png',
  'https://reactnative.dev/img/tiny_logo.png',
];

const FeedDetailScreen = () => {
  const textInputRef = useRef<TextInput>(null);

  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  const commentPressHandler = useCallback((commentId: number) => {
    setSelectedCommentId(prevId => (prevId === commentId ? null : commentId));
    textInputRef.current?.focus();
  }, []);

  const setSelectedCommentIdToNull = useCallback(() => {
    setSelectedCommentId(null);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 25}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableWithoutFeedback onPress={setSelectedCommentIdToNull}>
          <View style={{ flex: 1 }}>
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
                {'오늘 목표 달성 완료. 사진 첨부합니다 ! 오늘 목표 달성 완료. 사진 첨부합니다 ! 오늘 목표 달성 완료. 사진 첨부합니다 ! 오늘 목표 달성 완료. 사진 첨부합니다 ! 오늘 목표 달성 완료. 사진 첨부합니다 !'}
              </Text>
              {imageUrls.length > 0 && (
                <FlatList
                  style={styles.imageList}
                  data={imageUrls}
                  renderItem={({ item }) => <ImageItem imageUrl={item} />}
                  keyExtractor={(item, index) => `${index}`}
                  ItemSeparatorComponent={() => <Spacer size={16} horizontal />}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                />
              )}
            </View>
            <View style={styles.commentContainer}>
              <FlatList
                data={commentList}
                renderItem={({ item }) => (
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
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={false}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.commentInputContainer}>
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          placeholder={'댓글을 입력해 주세요.'}
          placeholderTextColor={'#968C7E'}
        />
        <TouchableOpacity>
          <WriteCommtentButton />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FeedDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
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
  imageList: {
    paddingLeft: 16,
    marginVertical: 32,
  },
  commentContainer: {
    flex: 1,
    backgroundColor: '#F2F0EF',
    paddingHorizontal: 8,
    paddingVertical: 18,
  },
  commentInputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#F2F0EF',
    minHeight: 50,
    paddingHorizontal: 15,
  },
});
