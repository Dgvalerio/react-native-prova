/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Text as BaseText, TextStyle } from 'react-native';

import { text } from '../styles/global';

const Text: FC<{ style?: TextStyle; bold?: boolean }> = ({
  children,
  style,
  bold = false,
  ...props
}) => (
  <BaseText
    style={
      bold ? { ...text, ...style, fontWeight: 'bold' } : { ...text, ...style }
    }
    {...props}
  >
    {children}
  </BaseText>
);

export default Text;
