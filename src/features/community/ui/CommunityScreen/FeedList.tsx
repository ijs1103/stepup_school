import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import FeedTableCell from './FeedTableCell';
import {Spacer} from '@/shared/ui/Spacer';
import ListEmptyComponent from './ListEmptyComponent';

const dataList = [1, 2, 3];

const FeedList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dataList}
        renderItem={({item}) => <FeedTableCell feedPressHandler={() => {}} />}
        keyExtractor={item => item.toString()}
        ListEmptyComponent={
          <ListEmptyComponent
            title={`아직 피드가 없어요\n피드를 작성해주세요`}
          />
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Spacer size={16} />}
        contentContainerStyle={{flexGrow: 1}}
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
