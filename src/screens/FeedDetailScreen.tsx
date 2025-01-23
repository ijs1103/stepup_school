import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {NavBar} from '@/shared/ui/NavBar';
import Avatar from '@/shared/ui/Avatar/Avatar';
import ImageItem from '@/features/community/ui/WritingScreen/ImageItem';
import {Spacer} from '@/shared/ui/Spacer';
import CommentTableCell from '@/features/community/ui/FeedDetailScreen/CommentTableCell';
import ListEmptyComponent from '@/features/community/ui/CommunityScreen/ListEmptyComponent';
import {TouchableWithoutFeedback} from 'react-native';
import {useCommunityStackRoute} from '@/app/navigation/RootNavigation';
import {useFeedDetail} from '@/features/community/model/useFeedDetail';
import useErrorToast from '@/shared/lib/hooks/useErrorToast';
import {useFeedComment} from '@/features/community/model/useFeedComment';
import Toast from 'react-native-toast-message';
import {useFeedCommentReply} from '@/features/community/model/useFeedCommentReply';
import WriteCommentButton from '@/features/community/ui/FeedDetailScreen/WriteCommentButton';

const ItemSeparatorComponent = () => <Spacer size={16} horizontal />;

const FeedDetailScreen = () => {
  const route = useCommunityStackRoute();
  const {data: feedDetailData, error: feedDetailError} = useFeedDetail(
    route.params?.feedId,
  );
  const {mutate: feedCommentMutate, error: feedCommentError} = useFeedComment(
    route.params?.feedId,
  );
  const {mutate: feedCommentReplyMutate, error: feedCommentReplyError} =
    useFeedCommentReply(route.params?.feedId);
  useErrorToast(feedDetailError?.message ?? '');
  useErrorToast(feedCommentError?.message ?? '');
  useErrorToast(feedCommentReplyError?.message ?? '');
  const textInputRef = useRef<TextInput>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );
  const [commentContent, setCommentContent] = useState('');

  const commentPressHandler = useCallback((commentId: number) => {
    setSelectedCommentId(prevId => (prevId === commentId ? null : commentId));
    textInputRef.current?.focus();
  }, []);

  const setSelectedCommentIdToNull = useCallback(() => {
    setSelectedCommentId(null);
  }, []);

  const writingCommentHandler = () => {
    if (selectedCommentId !== null) {
      feedCommentReplyMutate(
        {commentId: selectedCommentId, content: commentContent},
        {
          onSuccess: result => {
            setCommentContent('');
            Toast.show({
              type: 'success',
              text1: '대댓글이 게시되었습니다.',
              position: 'top',
              autoHide: true,
              visibilityTime: 2000,
            });
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1: error.message,
              position: 'top',
              autoHide: true,
              visibilityTime: 2000,
            });
          },
        },
      );
    } else {
      feedCommentMutate(
        {content: commentContent},
        {
          onSuccess: result => {
            setCommentContent('');
            Toast.show({
              type: 'success',
              text1: '댓글이 게시되었습니다.',
              position: 'top',
              autoHide: true,
              visibilityTime: 2000,
            });
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1: error.message,
              position: 'top',
              autoHide: true,
              visibilityTime: 2000,
            });
          },
        },
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 25}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={setSelectedCommentIdToNull}>
          <View style={{flex: 1}}>
            <NavBar backButtonIcon={'ArrowBackGray'} />
            <View style={styles.avatarContainer}>
              <Avatar imageUrl={feedDetailData?.avatarUrl} />
              <View style={styles.vStack}>
                <Text style={styles.nameText}>{feedDetailData?.userName}</Text>
                <Text style={styles.dateText}>{feedDetailData?.createdAt}</Text>
              </View>
            </View>
            <View style={styles.contentsContainer}>
              <Text>{feedDetailData?.contents}</Text>
              {feedDetailData?.imageUrls &&
                feedDetailData.imageUrls.length > 0 && (
                  <FlatList
                    style={styles.imageList}
                    data={feedDetailData.imageUrls}
                    renderItem={({item}) => <ImageItem imageUrl={item} />}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                  />
                )}
            </View>
            <View style={styles.commentContainer}>
              <FlatList
                data={feedDetailData?.comments}
                renderItem={({item, index}) => (
                  <CommentTableCell
                    data={item}
                    isSelected={selectedCommentId === item.id}
                    commentPressHandler={commentPressHandler}
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
        <WriteCommentButton
          pressHandler={writingCommentHandler}
          isValid={commentContent.trim() !== ''}
        />
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
