/* eslint-disable no-alert */
import React, { FC, useRef, useState } from 'react';
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import Container from '../components/Container';
import Footer from '../components/Footer';
import Text from '../components/Text';
import {
  headerTitle,
  title,
  forget,
  form,
  input,
  btnPrimary,
  btnSecondary,
  greenBottom,
} from '../styles/authentication';
import { theme } from '../styles/global';
import { SignInProps } from '../types/navigation';
import { checkEmailIsValid } from '../utils';

const SignIn: FC<SignInProps> = () => {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePressSignIn = () => {
    setIsLoading(true);

    if (!emailInputRef.current || !passwordInputRef.current) return;

    const email = emailInputRef.current.props.value;
    const password = passwordInputRef.current.props.value;

    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }

    if (!checkEmailIsValid(email)) {
      alert('Insira um e-mail válido!');
      return;
    }

    alert(JSON.stringify({ email, password }));
  };

  const handlePressForgetPassword = () => alert('Forget Password');

  const handlePressSignUp = () => alert('SignUp');

  if (isLoading)
    return (
      <View>
        <StatusBar style="auto" />
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );

  return (
    <Container>
      <Text style={headerTitle}>TGL</Text>
      <View style={greenBottom} />
      <Text style={title}>Authentication</Text>
      <View style={form}>
        <TextInput style={input} ref={emailInputRef} placeholder="Email" />
        <TextInput
          style={input}
          ref={passwordInputRef}
          placeholder="Password"
        />
        <TouchableOpacity onPress={handlePressForgetPassword}>
          <Text style={forget}>I forget my password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressSignIn}>
          <Text style={btnPrimary}>
            Log In{' '}
            <MaterialCommunityIcons
              name="arrow-right"
              size={30}
              color={theme.colors.primary}
            />
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handlePressSignUp}>
        <Text style={btnSecondary}>
          Sign Up{' '}
          <MaterialCommunityIcons
            name="arrow-right"
            size={30}
            color={theme.colors.textColor}
          />
        </Text>
      </TouchableOpacity>
      <Footer />
    </Container>
  );
};

export default SignIn;
