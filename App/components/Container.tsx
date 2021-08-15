import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { container } from '../styles/global';

const Container: FC = ({ children }) => (
  <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
    <View style={container}>
      <StatusBar style="auto" />
      {children}
    </View>
  </ScrollView>
);

export default Container;
