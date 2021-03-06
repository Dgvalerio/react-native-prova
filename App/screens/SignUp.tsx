import React, { FC, useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import Container from '../components/Container';
import Footer from '../components/Footer';
import Text from '../components/Text';
import { signUp } from '../store/auth/actions';
import { hideLoading, showLoading } from '../store/ui/actions';
import {
  btnPrimary,
  btnSecondary,
  form,
  greenBottom,
  headerTitle,
  input,
  inputError,
  title,
  passwordInputRow,
  passwordInputIcon,
  passwordInputDontMatch,
} from '../styles/authentication';
import { theme } from '../styles/global';
import { SignUpProps } from '../types/navigation';
import { checkEmailIsValid } from '../utils';

const SignUp: FC<SignUpProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecureEntry, setPasswordSecureEntry] = useState(true);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationSecureEntry, setPasswordConfirmationSecureEntry] =
    useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(
    () => setPasswordsMatch(password === passwordConfirmation),
    [password, passwordConfirmation]
  );

  const handlePressSignUp = async () => {
    dispatch(showLoading());

    if (!email || !name || !password || !passwordConfirmation) {
      alert('Preencha todos os campos!');
      dispatch(hideLoading());
      return;
    }

    if (!checkEmailIsValid(email)) {
      alert('Insira um e-mail válido!');
      dispatch(hideLoading());
      return;
    }

    if (password !== passwordConfirmation) {
      alert('As senhas não conferem!');
      dispatch(hideLoading());
      return;
    }

    dispatch(signUp(name, email, password, passwordConfirmation));
  };

  const handlePressBack = () => navigation.goBack();

  const togglePasswordSecureEntry = () =>
    setPasswordSecureEntry((prev) => !prev);

  const togglePasswordConfirmationSecureEntry = () =>
    setPasswordConfirmationSecureEntry((prev) => !prev);

  return (
    <Container>
      <Text style={headerTitle}>TGL</Text>
      <View style={greenBottom} />
      <Text style={title}>Registration</Text>
      <View style={form}>
        <TextInput
          style={input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <TextInput
          style={input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <View style={passwordInputRow}>
          <TextInput
            style={passwordsMatch ? input : inputError}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={
              passwordsMatch ? theme.colors.textColor : theme.colors.danger
            }
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
        <View style={passwordInputRow}>
          <TextInput
            style={passwordsMatch ? input : inputError}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            placeholder="Password Confirmation"
            placeholderTextColor={
              passwordsMatch ? theme.colors.textColor : theme.colors.danger
            }
            secureTextEntry={passwordConfirmationSecureEntry}
          />
          <TouchableOpacity
            onPress={togglePasswordConfirmationSecureEntry}
            style={passwordInputIcon}
          >
            <Feather
              name={passwordConfirmationSecureEntry ? 'eye-off' : 'eye'}
              size={24}
              color={theme.colors.textColor}
            />
          </TouchableOpacity>
        </View>
        {!passwordsMatch && (
          <Text style={passwordInputDontMatch}>
            Passwords don&apos;t Match!
          </Text>
        )}
        <TouchableOpacity onPress={handlePressSignUp}>
          <Text style={btnPrimary}>
            Register{' '}
            <MaterialCommunityIcons
              name="arrow-right"
              size={30}
              color={theme.colors.primary}
            />
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handlePressBack}>
        <Text style={btnSecondary}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={theme.colors.textColor}
          />{' '}
          Back
        </Text>
      </TouchableOpacity>
      <Footer />
    </Container>
  );
};

export default SignUp;
