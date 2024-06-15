import { Image } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IMAGE } from "../constants/image";

interface AuthWrapperProps extends PropsWithChildren {}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Image
        source={IMAGE.cropLogo}
        style={{
          width: 300,
          height: 200,
          objectFit: "contain",
        }}
      />
      <View style={{ width: "100%" }}>{children}</View>
    </SafeAreaView>
  );
};

export default AuthWrapper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
});
