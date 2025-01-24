import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ChallengeLogo from '../../assets/challenge_logo.svg';
import OptionButton from '../../assets/option_button.svg';
import ChallengeListItem from '@/features/\bchallenge/ui/ChallengeScreen/ChallengeListItem';
import ListEmptyComponent from '@/features/community/ui/CommunityScreen/ListEmptyComponent';
import {Spacer} from '@/shared/ui/Spacer';
import {useChallengeStackNavigation} from '@/app/navigation/RootNavigation';

const ItemSeparatorComponent = () => <Spacer size={10} />;

const ChallengeScreen = () => {
  const navigation = useChallengeStackNavigation();
  const navigateToDetail = useCallback((challengeId: number) => {
    navigation.navigate('ChallengeDetail', {challengeId});
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.hStack}>
          <ChallengeLogo />
          <Text style={styles.title}>{'챌린지'}</Text>
        </View>
        <OptionButton fill={'#FB970C'} />
      </View>
      <FlatList
        style={styles.flatList}
        data={[1, 2, 3]}
        renderItem={({item}) => (
          <ChallengeListItem navigateToDetail={() => navigateToDetail(item)} />
        )}
        keyExtractor={item => item.toString()}
        ListEmptyComponent={
          <ListEmptyComponent
            title={'아직 피드가 없어요\n피드를 작성해주세요'}
          />
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  );
};

export default ChallengeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 28,
    paddingRight: 16,
    paddingTop: 26,
    paddingBottom: 16,
  },
  hStack: {
    flexDirection: 'row',
    gap: 12,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    color: '#423D36',
  },
  flatList: {
    marginHorizontal: 16,
  },
});
