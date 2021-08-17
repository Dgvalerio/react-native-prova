import React, { FC } from 'react';
import { ActivityIndicator, Animated } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { theme } from '../styles/global';

const Loading: FC = () => (
  <Animated.View
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: `${theme.colors.backgroundColor}dd`,
    }}
  >
    <StatusBar style="auto" />
    <ActivityIndicator size={96} color={theme.colors.primary} />
  </Animated.View>
);

export default Loading;
