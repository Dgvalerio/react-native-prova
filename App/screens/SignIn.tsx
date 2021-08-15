import React, { FC, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import Container from '../components/Container';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
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
  passwordInputRow,
  passwordInputIcon,
} from '../styles/authentication';
import { theme } from '../styles/global';
import { SignInProps } from '../types/navigation';
import { checkEmailIsValid } from '../utils';

const SignIn: FC<SignInProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecureEntry, setPasswordSecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handlePressSignIn = () => {
    setIsLoading(true);

    if (!email || !password) {
      alert('Preencha todos os campos!');
      setIsLoading(false);
      return;
    }

    if (!checkEmailIsValid(email)) {
      alert('Insira um e-mail válido!');
      setIsLoading(false);
      return;
    }

    alert(JSON.stringify({ email, password }));
    setIsLoading(false);
  };

  const handlePressForgetPassword = () => navigation.navigate('ForgotPassword');

  const handlePressSignUp = () => navigation.navigate('SignUp');

  const togglePasswordSecureEntry = () =>
    setPasswordSecureEntry((prev) => !prev);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Text style={headerTitle}>TGL</Text>
      <View style={greenBottom} />
      <Text style={title}>Authentication</Text>
      <View style={form}>
        <TextInput
          style={input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <View style={passwordInputRow}>
          <TextInput
            style={input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={passwordSecureEntry}
          />
          <TouchableOpacity
            onPress={togglePasswordSecureEntry}
            style={passwordInputIcon}
          >
            <Feather
              name={passwordSecureEntry ? 'eye-off' : 'eye'}
              size={24}
              color={theme.colors.textColor}
            />
          </TouchableOpacity>
        </View>
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
