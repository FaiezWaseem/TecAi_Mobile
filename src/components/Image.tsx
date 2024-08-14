import React from 'react';
import { Image } from 'react-native';

export default ({
  source,
  width,
  height,
  rounded,
  style,
  m,
  ml,
  mt,
  mb,
  mr,
}: {
  source: any;
  width?: number | string;
  height?: number | string;
  rounded?: number;
  style?: any;
  m?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  mr?: number;
}) => {
  return (
    <Image
      source={source}
      style={{
        width,
        height,
        borderRadius: rounded,
        margin: m,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
        ...style,
      }}
    />
  );
};
