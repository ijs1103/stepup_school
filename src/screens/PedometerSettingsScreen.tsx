import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomSheet} from '@/shared/ui/CustomSheet';
import {NavBar} from '@/shared/ui/NavBar';
import TargetStepCountInput from '@/features/walking/ui/HomeScreen/\bPedometerSettingsScreen/TargetStepCountInput';
import {useTargetStepCountStore} from '@/features/user/model/stores/useTargetStepCountStore';
import {Spacer} from '@/shared/ui/Spacer';

const PedometerSettingsScreen = () => {
  const {targetStepCount, setTargetStepCount} = useTargetStepCountStore();
  const [target, setTarget] = useState(targetStepCount);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const openBottomSheet = () => setIsBottomSheetOpen(true);
  const closeBottomSheet = () => setIsBottomSheetOpen(false);
  const targetSettingHandler = (stepCount: number) => {
    setTarget(stepCount);
    setTargetStepCount(stepCount);
    closeBottomSheet();
  };

  return (
    <View style={styles.container}>
      <NavBar
        title={'만보기 설정'}
        backButtonIcon={'ArrowBackGray'}
        titleColor={'#423D36'}
      />
      <View style={styles.optionBoxContainer}>
        <Text style={styles.label}>{'걸음 목표'}</Text>
        <TouchableOpacity onPress={openBottomSheet}>
          <Text style={styles.stepText}>{`${target} 걸음`}</Text>
        </TouchableOpacity>
      </View>
      <Spacer size={10} />
      <CustomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet}>
        <TargetStepCountInput
          initialStepCount={target}
          submitHandler={targetSettingHandler}
        />
      </CustomSheet>
    </View>
  );
};

export default PedometerSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7F7',
  },
  optionBoxContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  label: {
    fontWeight: '500',
    lineHeight: 28,
  },
  stepText: {
    color: '#F77E5B',
    fontWeight: '500',
    lineHeight: 28,
  },
});
