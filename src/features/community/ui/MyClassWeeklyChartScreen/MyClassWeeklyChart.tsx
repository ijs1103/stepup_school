import {ActivityStats} from '@/features/walking/\bmodel/useDailyActivityStats';
import {CHART_CATEGORY_UNITS, DAYS_OF_WEEK} from '@/shared/constants';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

interface Props {
  data: DailyWalkingStats[];
  category: ChartCategory;
}

export interface DailyWalkingStats extends ActivityStats {
  date: string;
}

export type ChartCategory = 'distance' | 'stepCount' | 'burnedCalories';

const MyClassWeeklyChart = ({data, category}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const parsedData = Array.from({length: data.length}, (_, index) => ({
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
        return ['', '100000', '200000', '300000'];
      case 'burnedCalories':
        return ['', '5500', '11000', '16500'];
      case 'distance':
        return ['', '78', '154', '232'];
    }
  };
  const maxValue = (category: ChartCategory) => {
    switch (category) {
      case 'stepCount':
        return 300000;
      case 'burnedCalories':
        return 16500;
      case 'distance':
        return 232;
    }
  };
  return (
    <View style={{padding: 20}}>
      <BarChart
        data={parsedData}
        height={300}
        barWidth={24}
        spacing={16}
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{color: '#C7BBAB', fontSize: 10}}
        noOfSections={3}
        maxValue={maxValue(category)}
        yAxisLabelTexts={yAxisLabelTexts(category)}
        formatYLabel={label => Math.round(parseFloat(label)).toString()}
        yAxisLabelWidth={70}
        barBorderRadius={8}
        overflowTop={50}
        renderTooltip={(item, index) => {
          return (
            <View
              style={{
                backgroundColor: '#FB970C',
                padding: 8,
                borderRadius: 8,
                marginBottom: 20,
                minWidth: 40,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {`${item.value}\n${CHART_CATEGORY_UNITS[category]}`}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MyClassWeeklyChart;
