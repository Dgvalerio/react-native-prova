/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from 'react-native';

import { text, theme } from './global';

// eslint-disable-next-line import/prefer-default-export
export const {
  accountHeader,
  titleButton,
  title,
  titleButtonText,
  buttonText,
  textError,
  deleteButton,
  confirmButton,
  confirmButtonText,
  deleteButtonText,
  buttonsRow,
  form,
  inputOn,
  inputOff,
  titleButtonTextDanger,
} = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textTransform: 'uppercase',
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleButtonText: {
    fontSize: 22,
    textTransform: 'capitalize',
  },
  titleButtonTextDanger: {
    fontSize: 22,
    textTransform: 'capitalize',
    color: theme.colors.danger,
  },
  buttonText: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  textError: {
    color: theme.colors.danger,
    padding: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  deleteButtonText: {
    color: theme.colors.danger,
    fontSize: 20,
  },
  confirmButtonText: {
    color: theme.colors.primary,
    fontSize: 20,
  },
  buttonsRow: {
    marginVertical: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    width: '100%',
  },
  inputOn: {
    ...text,
    width: '100%',
    fontSize: 17,
    paddingVertical: 26,
    paddingHorizontal: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#ebebeb',
  },
  inputOff: {
    ...text,
    width: '100%',
    fontSize: 17,
    paddingVertical: 26,
    paddingHorizontal: 30,
    borderLeftWidth: 2,
    borderLeftColor: '#ebebeb',
  },
});
