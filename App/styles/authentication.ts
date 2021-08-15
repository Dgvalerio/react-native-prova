import { StyleSheet } from 'react-native';

import { text, theme } from './global';

// eslint-disable-next-line import/prefer-default-export
export const {
  headerTitle,
  title,
  forget,
  form,
  input,
  inputError,
  btnPrimary,
  btnSecondary,
  greenBottom,
  passwordInputRow,
  passwordInputIcon,
  passwordInputDontMatch,
} = StyleSheet.create({
  headerTitle: {
    fontSize: 44,
    fontWeight: 'bold',
  },
  greenBottom: {
    height: 8,
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 46,
  },
  title: {
    fontSize: 35,
    marginBottom: 26,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    width: '100%',
    borderRadius: 8,
    elevation: 2,
  },
  input: {
    ...text,
    width: '100%',
    fontSize: 17,
    paddingVertical: 26,
    paddingHorizontal: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#ebebeb',
  },
  inputError: {
    ...text,
    width: '100%',
    fontSize: 17,
    paddingVertical: 26,
    paddingHorizontal: 30,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.danger,
    color: theme.colors.danger,
  },
  forget: {
    color: '#C1C1C1',
    paddingTop: 26,
    paddingBottom: 13,
    marginHorizontal: 32,
    textAlign: 'right',
  },
  btnPrimary: {
    color: theme.colors.primary,
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 33,
    fontWeight: 'bold',
  },
  btnSecondary: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 33,
    fontWeight: 'bold',
  },
  passwordInputRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  passwordInputIcon: {
    padding: 12,
    marginLeft: -48,
  },
  passwordInputDontMatch: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    color: theme.colors.danger,
  },
});
