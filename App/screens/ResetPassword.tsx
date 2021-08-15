import React, { FC, useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import Container from '../components/Container';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Text from '../components/Text';
import {
  btnPrimary,
  btnSecondary,
  form,
  greenBottom,
  headerTitle,
  input,
  inputError,
  passwordInputDontMatch,
  passwordInputIcon,
  passwordInputRow,
  title,
} from '../styles/authentication';
import { theme } from '../styles/global';
import { ResetPasswordProps } from '../types/navigation';

const ResetPassword: FC<ResetPasswordProps> = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [passwordSecureEntry, setPasswordSecureEntry] = useState(true);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationSecureEntry, setPasswordConfirmationSecureEntry] =
    useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => setPasswordsMatch(password === passwordConfirmation),
    [password, passwordConfirmation]
  );

  const handlePressSignUp = async () => {
    setIsLoading(true);

    if (!password || !passwordConfirmation) {
      alert('Preencha todos os campos!');
      setIsLoading(false);
      return;
    }

    if (!password === !passwordConfirmation) {
      alert('As senhas não conferem!');
      setIsLoading(false);
      return;
    }

    alert(JSON.stringify({ password, passwordConfirmation }));
    setIsLoading(true);
  };

  const handlePressSignIn = () => navigation.navigate('SignIn');

  const togglePasswordSecureEntry = () =>
    setPasswordSecureEntry((prev) => !prev);

  const togglePasswordConfirmationSecureEntry = () =>
    setPasswordConfirmationSecureEntry((prev) => !prev);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Text style={headerTitle}>TGL</Text>
      <View style={greenBottom} />
      <Text style={title}>Reset password</Text>
      <View style={form}>
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
            Reset{' '}
            <MaterialCommunityIcons
              name="arrow-right"
              size={30}
              color={theme.colors.primary}
            />
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handlePressSignIn}>
        <Text style={btnSecondary}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={theme.colors.textColor}
          />{' '}
          Login
        </Text>
      </TouchableOpacity>
      <Footer />
    </Container>
  );
};

export default ResetPassword;
