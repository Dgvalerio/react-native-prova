/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleProp, StyleSheet } from 'react-native';

import { theme } from './global';

export const { flexRow } = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export const {
  header,
  headerLogo,
  headerLogoTitle,
  headerLogoGreen,
  headerIcon,
} = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  headerLogo: {
    padding: 16,
  },
  headerLogoTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  headerLogoGreen: {
    height: 6,
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
  },
  headerIcon: {
    padding: 16,
  },
});

export const { title, btnFilters, filtersText, pagination, filtersContainer } =
  StyleSheet.create({
    title: {
      fontWeight: 'bold',
      fontSize: 22,
      textTransform: 'uppercase',
      marginBottom: 16,
    },
    filtersText: {
      fontSize: 17,
      marginBottom: 16,
    },
    btnFilters: {
      flexDirection: 'row',
      overflow: 'scroll',
    },
    filtersContainer: {
      marginBottom: 26,
    },
    pagination: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export const betItem = (color: string): StyleProp<any> => {
  const { before, item, textColor, textBold, content } = StyleSheet.create({
    item: {
      flexDirection: 'row',
      marginBottom: 25,
      paddingVertical: 4,
    },
    before: {
      width: 6,
      borderRadius: 100,
      backgroundColor: color,
    },
    textBold: {
      fontWeight: 'bold',
      marginBottom: 12,
    },
    textColor: {
      fontWeight: 'bold',
      marginTop: 12,
      color,
    },
    content: {
      paddingLeft: 16,
    },
  });

  return { before, item, textColor, textBold, content };
};

export const btnType = (active: boolean, color: string): StyleProp<any> => {
  const { btn, text } = StyleSheet.create({
    btn: {
      paddingHorizontal: 18,
      paddingVertical: 6,
      borderRadius: 100,
      fontWeight: 'bold',
      fontSize: 13,
      backgroundColor: active ? color : '#fff',
      borderWidth: 2,
      borderColor: color,
      marginRight: 6,
    },
    text: {
      color: active ? '#fff' : color,
    },
  });

  return { btn, text };
};
