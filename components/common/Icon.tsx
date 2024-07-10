import React from "react";
import {
  Image,
  ImageProps,
  ImageSourcePropType
} from "react-native";
import { ICON } from "../../constants/image";

type IconSource =
  | { source: ImageSourcePropType; name?: undefined }
  | { name: keyof typeof ICON; source?: undefined };

type IconProps = ImageProps & IconSource & { size?: number };

const Icon: React.FC<IconProps> = (props) => {
  const { source, name, style, size = 24, ...rest } = props;
  const src = source ?? ICON[name];
  return (
    <Image
      source={src}
      style={[{ height: size, width: size }, style]}
      {...rest}
    />
  );
};

export default Icon;
