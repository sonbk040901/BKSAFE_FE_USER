import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import type { RootNavigationProp } from "../types/navigation";
import { COLOR } from "../constants/color";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "@rneui/themed";
import useInitApp from "../hook/useInitApp";
import { IMAGE } from "../constants/image";
interface SplashProps {
  navigation: RootNavigationProp;
}
const Splash = ({ navigation }: SplashProps) => {
  const [isLoading, isAuthenticated] = useInitApp();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated) {
      navigation.replace("App");
      return;
    }
    navigation.replace("Auth");
  }, [navigation, isLoading, isAuthenticated]);
  return (
    <LinearGradient
      colors={["#8abfff", "#ffffff", "#ffffff", "#429aff"]}
      style={styles.container}
    >
      <Image
        source={IMAGE.logo}
        style={{
          width: "100%",
          height: 250,
        }}
        resizeMode="contain"
      />
      <ActivityIndicator
        size="large"
        color={COLOR.primary}
        style={styles.indicator}
      />
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primary,
    flex: 1,
    justifyContent: "center",
  },
  indicator: {
    marginVertical: 10,
  },
});
