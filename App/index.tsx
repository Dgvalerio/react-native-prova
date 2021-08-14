import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

const { container } = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App: FC = () => (
  <View style={container}>
    <Text>Open up App.tsx to start working on your app!</Text>
    <StatusBar style="auto" />
  </View>
);

export default App;
