import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Divider} from '@/shared/ui/Divider';
import TabMenu, {TabType} from '@/features/community/ui/CommunityScreen/TabMenu';
import {useActivityStats} from '@/features/walking/\bmodel/useActivityStats';
import {formatWeekDates, getWeekDates} from '@/shared/lib/date/getWeekDates';
import WeeklyActivityView from '@/features/community/ui/CommunityScreen/WeeklyActivityView';
import RankingView from '@/features/community/ui/CommunityScreen/RankingView';
import {useCommunityStackNavigation} from '@/app/navigation/RootNavigation';
import {Spacer} from '@/shared/ui/Spacer';
import {ChartCategory} from '@/shared/ui/WeeklyChart/WeeklyChart';
import FeedList from '@/features/community/ui/CommunityScreen/FeedList';
import WritingButton from '@/features/community/ui/CommunityScreen/WritingButton';

const IMAGE_HEIGHT = 337;
const CommunityScreen = () => {
  const navigation = useCommunityStackNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('요약');
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const {activityStats, errorMessage, refetch} = useActivityStats({
    startDate: getWeekDates(currentWeekIndex).startDate,
    endDate: getWeekDates(currentWeekIndex).endDate,
  });
  const pressPrevHandler = useCallback(() => {
    setCurrentWeekIndex(prev => prev + 1);
  }, []);

  const pressNextHandler = useCallback(() => {
    if (currentWeekIndex === 0) {
      return;
    }
    setCurrentWeekIndex(prev => prev - 1);
  }, [currentWeekIndex]);
  //TODO: 주간 유저가 속한 학급의 걸음수 총합 데이터를 연동
  const data = {calorie: 65.3, time: 42, distance: 2.5};
  const navigateToMyClassRanking = useCallback(
    () => navigation.navigate('MyClassRanking'),
    [],
  );
  const navigateToRankingDetail = useCallback(
    () => navigation.navigate('RankingDetail'),
    [],
  );
  const navigateToWriting = useCallback(
    () => navigation.navigate('Writing'),
    [],
  );
  const [selectedCategory, setSelectedCategory] =
    useState<ChartCategory>('stepCount');
  return (
    <ImageBackground
      source={require('../../assets/community_background.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <View style={styles.schoolHstack}>
            <View style={styles.schoolInfoContainer}>
              <Text style={styles.classText}>{'1학년 3반'}</Text>
              <Text style={styles.schoolNameText}>{'노량진초등학교'}</Text>
            </View>
            <View style={styles.myClassButton}>
              <Text style={styles.myClassText}>{'우리 반'}</Text>
            </View>
          </View>
          <Text style={styles.schoolDescriptionText}>
            {'노량진초등학교 (설명)'}
          </Text>
          <Divider />
          <TabMenu
            activeTab={activeTab}
            firstTabPressHandler={() => setActiveTab('요약')}
            secondTabPressHandler={() => setActiveTab('피드')}
          />
          <View style={styles.subContainer}>
            {activeTab === '요약' && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={navigateToMyClassRanking}>
                  <WeeklyActivityView
                    dateText={formatWeekDates(getWeekDates(currentWeekIndex))}
                    pressPrevHandler={pressPrevHandler}
                    pressNextHandler={pressNextHandler}
                    data={data}
                  />
                </TouchableOpacity>
                <Spacer size={42} />
                <RankingView
                  navigateToRankingDetail={navigateToRankingDetail}
                  stepCountPressHandler={() => setSelectedCategory('stepCount')}
                  caloriesPressHandler={() =>
                    setSelectedCategory('burnedCalories')
                  }
                  distancePressHandler={() => setSelectedCategory('distance')}
                />
                <Spacer size={70} />
              </ScrollView>
            )}
            {activeTab === '피드' && (
              <>
                <FeedList />
                <WritingButton pressHandler={navigateToWriting} />
              </>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: IMAGE_HEIGHT,
  },
  overlay: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    position: 'absolute',
    top: IMAGE_HEIGHT * 0.66,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
  },
  schoolHstack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
  },
  schoolInfoContainer: {
    gap: 6,
  },
  classText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#423D36',
  },
  schoolNameText: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 15,
    color: '#968C7E',
  },
  myClassButton: {
    backgroundColor: '#FB970C',
    borderRadius: 32,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  myClassText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
  },
  schoolDescriptionText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#968C7E',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  subContainer: {
    flex: 1,
    backgroundColor: '#F2F0EF',
    position: 'relative',
  },
});
