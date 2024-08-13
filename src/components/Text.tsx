import React from 'react';
import { Text } from 'react-native';

export default ({
  children,
  style,
  bg,
  rounded,
  p,
  pt,
  pb,
  pl,
  pr,
  m,
  ml,
  mt,
  mb,
  mr,
  w,
  h,
  color,
  fontSize,
  alignItems,
  flex,
  flexDirection,
  justifyContent,
  fontWeight,
  selectable
}: {
  children: React.ReactNode;
  style?: object;
  bg?: string;
  rounded?: number;
  p?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  m?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  mr?: number;
  w?: number | string;
  h?: number | string;
  color?: string;
  fontSize?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flex?: boolean;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  selectable?: boolean;
}) => {
  return (
    <Text
      selectable={selectable}
      style={{
        alignItems,
        flexDirection,
        justifyContent,
        color,
        fontSize,
        fontWeight,
        borderRadius: rounded,
        padding: p,
        margin: m,
        backgroundColor: bg,
        width: w as any,
        height: h as any,
        paddingLeft: pl,
        paddingRight: pr,
        paddingTop: pt,
        paddingBottom: pb,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
        flex: flex ? 1 : undefined,
        ...(style as any)
      }}>
      {children}
    </Text>
  );
};