import React, { useEffect, useRef, useCallback, useState } from 'react';
import { View, StyleSheet, Animated, PanResponder, Dimensions, TouchableWithoutFeedback } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const CUSTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.6;

const CustomSheet = ({ isOpen, onClose, children, isHandleAvailable = false }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const animatedValue = useRef(new Animated.Value(CUSTOM_SHEET_MAX_HEIGHT)).current;
  const isAnimating = useRef(false);

  const openCustomSheet = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsVisible(true);
    animatedValue.setValue(CUSTOM_SHEET_MAX_HEIGHT);
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      isAnimating.current = false;
    });
  }, [animatedValue]);

  const closeCustomSheet = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    Animated.spring(animatedValue, {
      toValue: CUSTOM_SHEET_MAX_HEIGHT,
      useNativeDriver: true,
    }).start(() => {
      isAnimating.current = false;
      setIsVisible(false);
      if (onClose) onClose();
    });
  }, [animatedValue, onClose]);

  useEffect(() => {
    if (isOpen) {
      openCustomSheet();
    } else if (isVisible) {
      closeCustomSheet();
    }
  }, [isOpen, isVisible, openCustomSheet, closeCustomSheet]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isHandleAvailable,
      onPanResponderMove: (e, gesture) => {
        if (gesture.dy > 0) {
          animatedValue.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dy > CUSTOM_SHEET_MAX_HEIGHT / 2) {
          closeCustomSheet();
        } else {
          openCustomSheet();
        }
      },
    })
  ).current;

  const customSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, CUSTOM_SHEET_MAX_HEIGHT],
          outputRange: [0, CUSTOM_SHEET_MAX_HEIGHT],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const handleOverlayPress = useCallback(() => {
    if (!isAnimating.current) {
      closeCustomSheet();
    }
  }, [closeCustomSheet]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.customSheet, customSheetAnimation]}>
        <View style={styles.draggableArea} {...(isHandleAvailable ? panResponder.panHandlers : {})}>
          <View style={styles.dragHandle} />
        </View>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  customSheet: {
    height: CUSTOM_SHEET_MAX_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  draggableArea: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
});

export default CustomSheet;
