import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ChallengeLogo from '../../assets/challenge_logo.svg';
import OptionButton from '../../assets/option_button.svg';
import ChallengeListItem from '@/features/\bchallenge/ui/ChallengeScreen/ChallengeListItem';
import ListEmptyComponent from '@/features/community/ui/CommunityScreen/ListEmptyComponent';
import {Spacer} from '@/shared/ui/Spacer';
import {useChallengeStackNavigation} from '@/app/navigation/RootNavigation';
import {
  ParsedChallenge,
  useChallengeList,
} from '@/features/\bchallenge/model/useChallengeList';

const ItemSeparatorComponent = () => <Spacer size={10} />;

const ChallengeScreen = () => {
  const navigation = useChallengeStackNavigation();
  const {data} = useChallengeList();
  const navigateToDetail = useCallback((challenge: ParsedChallenge) => {
    navigation.navigate('ChallengeDetail', {challenge});
  }, []);
  const navigateToParticipationDetails = useCallback(() => {
    navigation.navigate('ParticipationDetails');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.hStack}>
          <ChallengeLogo />
          <Text style={styles.title}>{'챌린지'}</Text>
        </View>
        <TouchableOpacity onPress={navigateToParticipationDetails}>
          <OptionButton fill={'#FB970C'} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={({item}) => (
          <ChallengeListItem
            data={item}
            navigateToDetail={() => navigateToDetail(item)}
          />
        )}
        keyExtractor={item => item.challengeId.toString()}
        ListEmptyComponent={
          <ListEmptyComponent title={'진행중인 챌린지가 없어요'} />
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}
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
    paddingHorizontal: 16,
  },
});
