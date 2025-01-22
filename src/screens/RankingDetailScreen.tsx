import ListEmptyComponent from '@/features/community/ui/CommunityScreen/ListEmptyComponent';
import { mapToRankingData } from '@/features/ranking/lib/utils';
import { useClassRanking } from '@/features/ranking/model/useClassRanking';
import { usePersonalRanking } from '@/features/ranking/model/usePersonalRanking';
import RankingDetailTableCell from '@/features/ranking/ui/RankingDetailScreen/RankingDetailTableCell';
import useErrorToast from '@/shared/lib/hooks/useErrorToast';
import { ActivityStatsBar } from '@/shared/ui/ActivityStatsBar';
import { GradientBackgroundView } from '@/shared/ui/GradientBackgroundView';
import { NavBar } from '@/shared/ui/NavBar';
import { Spacer } from '@/shared/ui/Spacer';
import { ChartCategory } from '@/shared/ui/WeeklyChart/WeeklyChart';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';

const ItemSeparatorComponent = () => <Spacer size={16} />;

const RankingDetailScreen = () => {
    const [isToggledOn, setIsToggledOn] = useState(false);
    const [selectedCategory, setSelectedCategory] =
        useState<ChartCategory>('stepCount');
    const { data: personalRankingData, error: personalRankingError } = usePersonalRanking();
    const { data: classRankingData, error: classRankingError } = useClassRanking();
    console.log('personalRankingData', personalRankingData);
    useErrorToast(personalRankingError?.message ?? '');
    useErrorToast(classRankingError?.message ?? '');
    const rankingData = mapToRankingData(isToggledOn ? classRankingData : personalRankingData, !isToggledOn);

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
                data={rankingData}
                renderItem={({ item, index }) => (
                    <RankingDetailTableCell rank={index + 1} name={item.name} stat={item[selectedCategory].toLocaleString()} />
                )}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={
                    <ListEmptyComponent
                        title={'아직 데이터가 없어요.'}
                    />
                }
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparatorComponent}
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

