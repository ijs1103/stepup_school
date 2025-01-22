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
import { useCommunityStackRoute } from '@/app/navigation/RootNavigation';
import { useFeedDetail } from '@/features/community/model/useFeedDetail';
import useErrorToast from '@/shared/lib/hooks/useErrorToast';
import { useFeedComment } from '@/features/community/model/useFeedComment';

const ItemSeparatorComponent = () => <Spacer size={16} horizontal />;

const FeedDetailScreen = () => {
  const route = useCommunityStackRoute();
  const { data, error } = useFeedDetail(route.params?.feedId);
  const [commentContent, setCommentContent] = useState('');
  //TODO: 댓글작성 api 연동
  const { } = useFeedComment(route.params?.feedId, { content: commentContent });
  useErrorToast(error?.message ?? '');
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
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={setSelectedCommentIdToNull}>
          <View style={{ flex: 1 }}>
            <NavBar backButtonIcon={'ArrowBackGray'} />
            <View style={styles.avatarContainer}>
              <Avatar source={{ uri: data?.avatarUrl }} />
              <View style={styles.vStack}>
                <Text style={styles.nameText}>{data?.userName}</Text>
                <Text style={styles.dateText}>{data?.createdAt}</Text>
              </View>
            </View>
            <View style={styles.contentsContainer}>
              <Text>
                {data?.contents}
              </Text>
              {data?.imageUrls && data.imageUrls.length > 0 && (
                <FlatList
                  style={styles.imageList}
                  data={data.imageUrls}
                  renderItem={({ item }) => <ImageItem imageUrl={item} />}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  ItemSeparatorComponent={ItemSeparatorComponent}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                />
              )}
            </View>
            <View style={styles.commentContainer}>
              <FlatList
                data={data?.comments}
                renderItem={({ item, index }) => (
                  <CommentTableCell
                    data={item}
                    isSelected={selectedCommentId === index}
                    commentPressHandler={() => commentPressHandler(index)}
                  />
                )}
                keyExtractor={(item) => `${item.create_at}-${item.content}-${item.user.nickname}`}
                ListEmptyComponent={
                  <ListEmptyComponent
                    title={`아직 댓글이 없어요\n댓글을 남겨주세요`}
                  />
                }
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Spacer size={16} />}
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
          value={commentContent}
          onChangeText={setCommentContent}
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
    paddingBottom: 36,
  },
  imageList: {
    paddingLeft: 16,
    marginVertical: 32,
  },
  commentContainer: {
    backgroundColor: '#F2F0EF',
    paddingHorizontal: 8,
    paddingVertical: 18,
    flex: 1,
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
