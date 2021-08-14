import React, { FC } from 'react';
import { Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import Container from '../components/Container';
import { SignUpProps } from '../types/navigation';

const SignUp: FC<SignUpProps> = () => (
  <Container>
    <StatusBar style="auto" />
    <Text>SignUp</Text>
  </Container>
);

export default SignUp;
