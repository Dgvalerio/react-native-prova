import React, { FC, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  title,
} from '../styles/authentication';
import { theme } from '../styles/global';
import { ForgotPasswordProps } from '../types/navigation';
import { checkEmailIsValid } from '../utils';

const ForgotPassword: FC<ForgotPasswordProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePressSendLink = () => {
    setIsLoading(true);

    if (!email) {
      alert('Preencha o e-mail!');
      setIsLoading(false);
      return;
    }

    if (!checkEmailIsValid(email)) {
      alert('Insira um e-mail válido!');
      setIsLoading(false);
      return;
    }

    alert(JSON.stringify({ email }));
    setIsLoading(false);
  };

  const handlePressBack = () => navigation.goBack();

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Text style={headerTitle}>TGL</Text>
      <View style={greenBottom} />
      <Text style={title}>Reset password</Text>
      <View style={form}>
        <TextInput
          style={input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TouchableOpacity onPress={handlePressSendLink}>
          <Text style={btnPrimary}>
            Send link{' '}
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

export default ForgotPassword;
