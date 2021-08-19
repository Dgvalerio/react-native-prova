import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { signOut } from '../store/auth/actions';
import { hideLoading } from '../store/ui/actions';
import { theme } from '../styles/global';
import {
  header,
  headerIcon,
  headerLogo,
  headerLogoGreen,
  headerLogoTitle,
} from '../styles/home';
import {
  AccountScreenNavigationProp,
  NewBetScreenNavigationProp,
  RecentGamesScreenNavigationProp,
} from '../types/navigation';
import Text from './Text';

const Header: FC<{
  cartButton?: boolean;
  onCartPress?: () => void;
  navigation:
    | AccountScreenNavigationProp
    | RecentGamesScreenNavigationProp
    | NewBetScreenNavigationProp;
}> = ({ cartButton = false, onCartPress, navigation }) => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(hideLoading());
    dispatch(signOut());
  };

  const goHome = () => navigation.navigate('RecentGames');

  return (
    <View style={header}>
      <TouchableOpacity style={headerLogo} onPress={goHome}>
        <Text style={headerLogoTitle}>TGL</Text>
        <View style={headerLogoGreen} />
      </TouchableOpacity>
      {cartButton && (
        <TouchableOpacity
          onPress={onCartPress}
          style={{ marginLeft: 'auto', padding: 8 }}
        >
          <AntDesign
            name="shoppingcart"
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleSignOut} style={{ padding: 8 }}>
        <MaterialIcons
          name="logout"
          size={24}
          color="#C1C1C1"
          style={headerIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
