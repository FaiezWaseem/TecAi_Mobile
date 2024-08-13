import * as React from 'react';
import { TextInput } from 'react-native';
import Box from './Box';

const variantType = {
  outline: {
    borderWidth: 1,
    padding: 6,
  },
  underline: {
    borderBottomWidth: 1,
    padding: 6,
  },
};

export default ({
  placeholder,
  value,
  onChangeText,
  w,
  h,
  m,
  p,
  rounded,
  hintColor,
  mt,
  mb,
  style,
  bg = 'rgba(128, 128, 128, 0.2)',
  color = 'rgba(0, 0, 0, 0.8)',
  variant = 'underline',
  variantcolor = 'rgba(128, 128, 128, 1)',
}: {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  w?: number | string;
  h?: number | string;
  m?: number | string;
  p?: number | string;
  rounded?: number;
  hintColor?: string;
  mt?: number | string;
  mb?: number | string;
  style?: object;
  bg?: string;
  color?: string;
  variant?: 'outline' | 'underline';
  variantcolor?: string;
}) => {
  return (
    <Box
      w={w}
      h={h}
      m={m}
      mt={mt}
      mb={mb}
      rounded={rounded}
      bg={bg}
      justifyContent="center"
      alignItems="center"
      style={{
        ...style,
      }}>
      <TextInput
        style={{
          ...variantType[variant],
          borderColor: variantcolor,
          borderRadius: rounded,
          padding: p as any,
          height: typeof h === 'number' ? h : undefined,
          color: color,
          width: '100%',
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={hintColor}
      />
    </Box>
  );
};
