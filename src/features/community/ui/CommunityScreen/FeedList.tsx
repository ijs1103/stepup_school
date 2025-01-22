import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import FeedTableCell from './FeedTableCell';
import { Spacer } from '@/shared/ui/Spacer';
import ListEmptyComponent from './ListEmptyComponent';
import { ParsedFeed } from '../../model/useFeedList';

interface Props {
  data: ParsedFeed[];
  feedPressHandler: (feedId: number) => void;
}

const ItemSeparatorComponent = () => <Spacer size={16} />

const FeedList = ({ data, feedPressHandler }: Props) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <FeedTableCell
            data={item}
            feedPressHandler={() => feedPressHandler(item.feedId)}
          />
        )}
        keyExtractor={item => item.feedId.toString()}
        ListEmptyComponent={
          <ListEmptyComponent
            title={'아직 피드가 없어요\n피드를 작성해주세요'}
          />
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

export default FeedList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    paddingHorizontal: 16,
    paddingBottom: 26,
  },
});
