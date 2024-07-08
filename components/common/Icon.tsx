import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, ImageProps } from 'react-native';

interface IconProps extends ImageProps {
  source: ImageSourcePropType;
}

const Icon: React.FC<IconProps> = ({ source, style, ...rest }) => {
  return <Image source={source} style={[styles.icon, style]} {...rest} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default Icon;
