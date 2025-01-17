import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ChevronLeft from '../../../../assets/prev_button.svg';
import ChevronRight from '../../../../assets/chevron_front.svg';

interface Props {
  title: string;
  pressPrevHandler: () => void;
  pressNextHandler: () => void;
}

const DateNavigator = ({title, pressPrevHandler, pressNextHandler}: Props) => {
  return (
    <View style={styles.hStack}>
      <TouchableOpacity onPress={pressPrevHandler}>
        <ChevronLeft />
      </TouchableOpacity>
      <View>
        <Text style={styles.dateText}>{title}</Text>
      </View>
      <TouchableOpacity onPress={pressNextHandler}>
        <ChevronRight />
      </TouchableOpacity>
    </View>
  );
};

export default DateNavigator;

const styles = StyleSheet.create({
  hStack: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    color: '#968C7E',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});
