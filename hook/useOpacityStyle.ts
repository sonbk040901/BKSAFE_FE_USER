import { useEffect, useState } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const useOpacityStyle = () => {
  const animatedValue = useSharedValue(1);
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: animatedValue.value,
  }));
  const [showContent, setShowContent] = useState(true);
  useEffect(() => {
    animatedValue.value = withTiming(showContent ? 1 : 0, {}, () => {});
  }, [animatedValue, showContent]);
  return [opacityStyle, setShowContent] as const;
};
export default useOpacityStyle;
