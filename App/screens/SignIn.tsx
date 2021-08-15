import React, { FC, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import Container from '../components/Container';
import Footer from '../components/Footer';
import Text from '../components/Text';
import { signIn } from '../store/auth/actions';
import { hideLoading, showLoading } from '../store/ui/actions';
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
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecureEntry, setPasswordSecureEntry] = useState(true);

  const handlePressSignIn = () => {
    dispatch(showLoading());

    if (!email || !password) {
      alert('Preencha todos os campos!');
      dispatch(hideLoading());
      return;
    }

    if (!checkEmailIsValid(email)) {
      alert('Insira um e-mail válido!');
      dispatch(hideLoading());
      return;
    }

    dispatch(signIn(email, password));
  };

  const handlePressForgetPassword = () => navigation.navigate('ForgotPassword');

  const handlePressSignUp = () => navigation.navigate('SignUp');

  const togglePasswordSecureEntry = () =>
    setPasswordSecureEntry((prev) => !prev);

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
