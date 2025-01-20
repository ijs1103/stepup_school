import { ActivityStats } from '@/features/walking/\bmodel/useDailyActivityStats';
import { CHART_CATEGORY_UNITS, DAYS_OF_WEEK } from '@/shared/constants';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

interface Props {
  data: DailyWalkingStats[];
  category: ChartCategory;
}

export interface DailyWalkingStats extends ActivityStats {
  date: string;
}

export type ChartCategory = 'distance' | 'stepCount' | 'burnedCalories';

const WeeklyChart = ({ data, category }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const parsedData = Array.from({ length: data.length }, (_, index) => ({
    value: data[index][category],
    label: `${DAYS_OF_WEEK[index]}`,
    labelTextStyle: {
      color: '#C7BBAB',
      textAlign: 'center',
      fontSize: 10,
    },
    frontColor: selectedIndex === index ? '#FB970C' : '#FDB44F',
    onPress: () => {
      setSelectedIndex(index);
    },
  }));
  const yAxisLabelTexts = (category: ChartCategory) => {
    switch (category) {
      case 'stepCount':
        return ['', '5000', '10000', '15000'];
      case 'burnedCalories':
        return ['', '275', '550', '825'];
      case 'distance':
        return ['', '3.9', '7.7', '11.6'];
    }
  };
  const maxValue = (category: ChartCategory) => {
    switch (category) {
      case 'stepCount':
        return 15000;
      case 'burnedCalories':
        return 825;
      case 'distance':
        return 11.6;
    }
  };
  return (
    <View style={{ padding: 20 }}>
      <BarChart
        data={parsedData}
        height={300}
        barWidth={24}
        spacing={16}
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: '#C7BBAB', fontSize: 10 }}
        noOfSections={3}
        maxValue={maxValue(category)}
        yAxisLabelTexts={yAxisLabelTexts(category)}
        yAxisLabelWidth={50}
        barBorderRadius={8}
        leftShiftForLastIndexTooltip={55}
        renderTooltip={(item, index) => {
          return (
            <View
              style={{
                backgroundColor: '#FB970C',
                padding: 10,
                borderRadius: 10,
                minWidth: 80,
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                {`${item.value} ${CHART_CATEGORY_UNITS[category]}`}
              </Text>
              <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                {`${data[index].date}`}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default WeeklyChart;
