import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Container from '../components/Container';
import Footer from '../components/Footer';
import Text from '../components/Text';
import { signOut } from '../store/auth/actions';
import {
  headerTitle,
  title,
  greenBottom,
  btnSecondary,
} from '../styles/authentication';
import { theme } from '../styles/global';
import { HomeProps } from '../types/navigation';

const Home: FC<HomeProps> = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => dispatch(signOut());

  return (
    <Container>
      <Text style={headerTitle}>TGL</Text>
      <View style={greenBottom} />
      <Text style={title}>Home</Text>
      <TouchableOpacity onPress={handleSignOut}>
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

export default Home;
