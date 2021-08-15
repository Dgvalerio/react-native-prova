import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { theme } from '../styles/global';

const Loading: FC = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.colors.backgroundColor,
    }}
  >
    <StatusBar style="auto" />
    <ActivityIndicator size={96} color={theme.colors.primary} />
  </View>
);

export default Loading;
