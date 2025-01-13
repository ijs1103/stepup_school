import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';

interface TargetStepCountState {
  targetStepCount: number;
  setTargetStepCount: (stepCount: number) => void;
}

export const useTargetStepCountStore = create<TargetStepCountState>()(
  persist(
    (set) => ({
      targetStepCount: 5000,
      setTargetStepCount: (stepCount: number) =>
        set({targetStepCount: stepCount}),
    }),
    {
      name: 'targetStepCount-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
