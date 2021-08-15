import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    backgroundColor: '#F7F7F7',
    textColor: '#707070',
    primary: '#B5C401',
    danger: '#C45A5A',
  },
};

export const { container, text } = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 34,
    paddingHorizontal: 34,
  },
  text: {
    color: theme.colors.textColor,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
