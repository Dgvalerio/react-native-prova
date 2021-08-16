import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { MaterialIcons } from '@expo/vector-icons';

import Footer from '../components/Footer';
import Text from '../components/Text';
import { signOut } from '../store/auth/actions';
import {
  header,
  headerIcon,
  headerLogo,
  headerLogoGreen,
  headerLogoTitle,
} from '../styles/home';
import { NewBetProps } from '../types/navigation';

const NewBet: FC<NewBetProps> = () => {
  const dispatch = useDispatch();
  const handleSignOut = () => dispatch(signOut());

  return (
    <View>
      <View style={header}>
        <View style={headerLogo}>
          <Text style={headerLogoTitle}>TGL</Text>
          <View style={headerLogoGreen} />
        </View>
        <TouchableOpacity onPress={handleSignOut}>
          <MaterialIcons
            name="logout"
            size={24}
            color="#C1C1C1"
            style={headerIcon}
          />
        </TouchableOpacity>
      </View>
      <Text>NewBet</Text>
      <Footer />
    </View>
  );
};

export default NewBet;
