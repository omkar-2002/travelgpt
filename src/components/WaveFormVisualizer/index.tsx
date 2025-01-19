import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

interface WaveformVisualizerProps {
  isRecording: boolean;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isRecording,
}) => {
  const bars = Array(20).fill(0);

  const createBarStyle = (index: number) =>
    useAnimatedStyle(() => {
      if (!isRecording) {
        return {
          height: withTiming(20, {duration: 300}),
        };
      }

      return {
        height: withRepeat(
          withDelay(
            index * 100,
            withSequence(
              withTiming(20 + Math.random() * 40, {duration: 500}),
              withTiming(20, {duration: 500}),
            ),
          ),
          -1,
          true,
        ),
      };
    });

  return (
    <View style={styles.container}>
      {bars.map((_, index) => (
        <Animated.View
          key={index}
          style={[styles.bar, createBarStyle(index)]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  bar: {
    width: 4,
    backgroundColor: '#FF4444',
    borderRadius: 2,
  },
});

export default WaveformVisualizer;
