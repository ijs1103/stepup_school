import {FlatList, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {NavBar} from '@/shared/ui/NavBar';
import ParticipationDetailsListItem from '@/features/challenge/ui/ParticipationDetailsScreen/ParticipationDetailsListItem';
import ListEmptyComponent from '@/features/community/ui/CommunityScreen/ListEmptyComponent';
import {Spacer} from '@/shared/ui/Spacer';
import {useChallengeList} from '@/features/challenge/model/useChallengeList';

const ItemSeparatorComponent = () => <Spacer size={10} />;

const ParticipationDetailsScreen = () => {
  const {data} = useChallengeList();
  const doneChallengeList = useMemo(
    () => data?.filter(item => item.isDone),
    [data],
  );

  return (
    <View style={styles.container}>
      <NavBar
        title={'참여 내역'}
        titleColor="#423836"
        backButtonIcon={'ArrowBackGray'}
      />
      <FlatList
        style={styles.flatList}
        data={doneChallengeList}
        renderItem={({item}) => <ParticipationDetailsListItem data={item} />}
        keyExtractor={item => item.challengeId.toString()}
        ListEmptyComponent={
          <ListEmptyComponent title={'아직 참여내역이 없습니다'} />
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}
      />
    </View>
  );
};

export default ParticipationDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    paddingHorizontal: 16,
  },
});
