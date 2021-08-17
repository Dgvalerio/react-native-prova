/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dimensions, StyleProp, StyleSheet } from 'react-native';

import { theme } from './global';

const windowHeight = Dimensions.get('window').height;

export const {
  button,
  buttonText,
  greenButton,
  greenButtonText,
  buttons,
  numbersButtons,
  description,
  descriptionTitle,
  descriptionText,
} = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginRight: 8,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 13,
  },
  greenButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  greenButtonText: {
    color: 'white',
    fontSize: 13,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  numbersButtons: {
    flexDirection: 'row',
    marginHorizontal: -5,
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  description: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 24,
  },
});

export const {
  cartView,
  cartTitle,
  cartHeader,
  cartTotal,
  cartButtonSave,
  cartButtonSaveText,
  cartOverview,
} = StyleSheet.create({
  cartOverview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffffcc',
    alignItems: 'flex-end',
  },
  cartView: {
    height: windowHeight - 71,
    width: '70%',
    padding: 28,
    backgroundColor: '#fff',
    borderRadius: 13,
    justifyContent: 'space-between',
  },
  cartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 12,
  },
  cartTotal: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
  cartHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  cartButtonSave: {
    marginTop: 24,
    backgroundColor: '#EBEBEB',
    marginHorizontal: -28,
    marginBottom: -28,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    alignItems: 'center',
  },
  cartButtonSaveText: {
    textAlign: 'center',
    color: theme.colors.primary,
    paddingVertical: 19,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export const numberButton = (color: string): StyleProp<any> => {
  const { btn, txt } = StyleSheet.create({
    btn: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    },
    txt: {
      display: 'flex',
      textAlignVertical: 'center',
      color: 'white',
      fontSize: 18,
      backgroundColor: color || '#ADC0C4',
      width: 58,
      height: 58,
      textAlign: 'center',
      borderRadius: 100,
    },
  });

  return { btn, txt };
};

export const miniNumberButton = (color: string): StyleProp<any> => {
  const { btn, txt } = StyleSheet.create({
    btn: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    },
    txt: {
      display: 'flex',
      textAlignVertical: 'center',
      color: 'white',
      fontSize: 13,
      backgroundColor: color || '#ADC0C4',
      width: 40,
      height: 40,
      textAlign: 'center',
      borderRadius: 100,
    },
  });

  return { btn, txt };
};

export const cartItem = (color: string): StyleProp<any> => {
  const { before, item, textColor, textBold, content, textNormal } =
    StyleSheet.create({
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
        fontSize: 13,
        marginBottom: 6,
      },
      textNormal: {
        fontSize: 13,
      },
      textColor: {
        fontWeight: 'bold',
        marginTop: 6,
        color,
      },
      content: {
        paddingLeft: 16,
        flex: 1,
      },
    });

  return { before, item, textColor, textBold, content, textNormal };
};
