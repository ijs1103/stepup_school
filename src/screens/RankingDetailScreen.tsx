import ListEmptyComponent from '@/features/community/ui/CommunityScreen/ListEmptyComponent';
import RankingDetailTableCell from '@/features/ranking/ui/RankingDetailScreen/RankingDetailTableCell';
import { ActivityStatsBar } from '@/shared/ui/ActivityStatsBar';
import { GradientBackgroundView } from '@/shared/ui/GradientBackgroundView';
import { NavBar } from '@/shared/ui/NavBar';
import { Spacer } from '@/shared/ui/Spacer';
import { ChartCategory } from '@/shared/ui/WeeklyChart/WeeklyChart';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';

const integratedRankingDataList = [{ name: '1-1', stepCount: '146,552' }, { name: '2-3', stepCount: '111,000' }, { name: '3-1', stepCount: '109,552' }, { name: '1-2', stepCount: '99,556' }];
const myClassRankingDataList = [{ name: '김ㅇㅇ', stepCount: '146,552' }, { name: '박ㅇㅇ', stepCount: '111,000' }, { name: '최ㅇㅇ', stepCount: '109,552' }, { name: '유ㅇㅇ', stepCount: '99,556' }, { name: '김ㅇㅇ', stepCount: '146,552' }, { name: '박ㅇㅇ', stepCount: '111,000' }, { name: '최ㅇㅇ', stepCount: '109,552' }, { name: '유ㅇㅇ', stepCount: '99,556' }, { name: '김ㅇㅇ', stepCount: '146,552' }, { name: '박ㅇㅇ', stepCount: '111,000' }, { name: '최ㅇㅇ', stepCount: '109,552' }, { name: '유ㅇㅇ', stepCount: '99,556' }, { name: '김ㅇㅇ', stepCount: '146,552' }, { name: '박ㅇㅇ', stepCount: '111,000' }, { name: '최ㅇㅇ', stepCount: '109,552' }, { name: '유ㅇㅇ', stepCount: '99,556' }];

const RankingDetailScreen = () => {
    const [isToggledOn, setIsToggledOn] = useState(false);
    const [selectedCategory, setSelectedCategory] =
        useState<ChartCategory>('stepCount');

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                ListHeaderComponent={(
                    <GradientBackgroundView colors={['#FD81B5', '#F8F7F7']}>
                        <NavBar title={isToggledOn ? '통합 랭킹' : '우리반 랭킹'} backButtonIcon={'ArrowBackWhite'} rightItem={<Switch
                            trackColor={{ false: '#787880', true: '#FD4F97' }}
                            thumbColor={'#fff'}
                            onValueChange={() => setIsToggledOn(prev => !prev)}
                            value={isToggledOn}
                        />} />
                        <Spacer size={48} />
                        <View style={styles.activityContainer}>
                            <Text style={styles.label}>{'산출 기준 선택'}</Text>
                            <ActivityStatsBar color={'#FD4F97'} pressHandler={setSelectedCategory} />
                        </View>
                    </GradientBackgroundView>
                )}
                data={isToggledOn ? integratedRankingDataList : myClassRankingDataList}
                renderItem={({ item, index }) => (
                    <RankingDetailTableCell rank={index + 1} name={item.name} stat={item.stepCount} />
                )}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={
                    <ListEmptyComponent
                        title={'아직 데이터가 없어요.'}
                    />
                }
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Spacer size={16} />}
                stickyHeaderIndices={[0]}
            />
        </View>
    );
};

export default RankingDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F7F7',
    },
    activityContainer: {
        paddingHorizontal: 14,
        paddingBottom: 32,
        gap: 2,
    },
    label: {
        fontSize: 12,
        lineHeight: 28,
        fontWeight: '700',
        color: '#fff',
    },
    flatList: {
        flex: 1,
    },
});

