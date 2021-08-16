import { StyleSheet } from 'react-native';

import { theme } from './global';

export const { iconText, activeIconText, iconTab, ativeBorder, megaIcon } =
  StyleSheet.create({
    iconText: {
      fontSize: 14,
      fontWeight: 'normal',
      color: '#C1C1C1',
    },
    activeIconText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    iconTab: {
      paddingBottom: 13,
      alignItems: 'center',
    },
    ativeBorder: {
      backgroundColor: theme.colors.primary,
      height: 4,
      marginBottom: 10,
      width: 30,
      borderRadius: 100,
    },
    megaIcon: {
      backgroundColor: theme.colors.primary,
      width: 83,
      height: 83,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 5,
      borderColor: '#ffffff',
      shadowColor: '#0000002E',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 25,
      elevation: 5,
      marginBottom: 32,
    },
  });
