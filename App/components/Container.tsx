import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { StatusBar } from 'expo-status-bar';

import { container, signedContainer } from '../styles/global';

const Container: FC = ({ children }) => {
  const { signed } = useSelector((state) => state.auth);

  return (
    <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
      <View style={signed ? signedContainer : container}>
        <StatusBar style="auto" />
        {children}
      </View>
    </ScrollView>
  );
};

export default Container;
