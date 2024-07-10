import React from "react";
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { ICON } from "../../constants/image";

type IconSource =
  | { source: ImageSourcePropType; name?: undefined }
  | { name: keyof typeof ICON; source?: undefined };

type IconProps = ImageProps & IconSource;

const Icon: React.FC<IconProps> = (props) => {
  const { source, name, style, ...rest } = props;
  const src = source ?? ICON[name];
  return (
    <Image
      source={src}
      style={[styles.icon, style]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default Icon;
