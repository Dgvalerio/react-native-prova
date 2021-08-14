import React, { FC } from 'react';
import { Text as BaseText, TextStyle } from 'react-native';

import { text } from '../styles/global';

const Text: FC<{ style?: TextStyle }> = ({ children, style, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <BaseText style={{ ...text, ...style }} {...props}>
    {children}
  </BaseText>
);

export default Text;
