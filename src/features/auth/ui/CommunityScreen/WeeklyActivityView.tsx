import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DateNavigator} from '@/shared/ui/DateNavigator';
import {ActivityView} from '@/shared/ui/ActivityView';
import {ActivityViewData} from '@/shared/ui/ActivityView/ActivityView';
import {Spacer} from '@/shared/ui/Spacer';

interface Props {
  dateText: string;
  pressPrevHandler: () => void;
  pressNextHandler: () => void;
  data: ActivityViewData;
}

const WeeklyActivityView = ({
  dateText,
  pressPrevHandler,
  pressNextHandler,
  data,
}: Props) => {
  return (
    <View style={styles.container}>
      <Spacer size={48} />
      <DateNavigator
        title={dateText}
        pressPrevHandler={pressPrevHandler}
        pressNextHandler={pressNextHandler}
      />
      <Spacer size={24} />
      <View style={styles.activityViewContainer}>
        <ActivityView data={data} iconColor={'#FDB44F'} textColor={'#C7BBAB'} />
      </View>
    </View>
  );
};

export default WeeklyActivityView;

const styles = StyleSheet.create({
  container: {},
  activityViewContainer: {
    marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
});
