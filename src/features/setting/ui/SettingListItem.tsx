import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BellIcon from '../../../../assets/bell_icon.svg';
import PersonIcon from '../../../../assets/person_icon.svg';
import RightArrow from '../../../../assets/right_arrow.svg';
import SecurityIcon from '../../../../assets/security_icon.svg';
import AconIcon from '../../../../assets/acon_icon.svg';

export interface SettingListItemProps {
  iconName: 'person' | 'bell' | 'eye' | 'security' | 'acon';
  title: string;
  pressHandler: () => void;
}

const SettingListItem = ({
  iconName,
  title,
  pressHandler,
}: SettingListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.hStack}>
        {iconName === 'person' && <PersonIcon />}
        {iconName === 'bell' && <BellIcon />}
        {iconName === 'security' && <SecurityIcon />}
        {iconName === 'acon' && <AconIcon />}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable hitSlop={{left: 10}} onPress={pressHandler}>
        <RightArrow />
      </Pressable>
    </View>
  );
};

export default SettingListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 28,
    paddingRight: 16,
    paddingVertical: 8,
  },
  hStack: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 26,
  },
});
