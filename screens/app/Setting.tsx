import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import AppWrapper from "../../components/AppWrapper";
import { AppNavigationProp } from "../../types/navigation";
import { Button } from "@rneui/themed";

interface SettingProps {
  navigation: AppNavigationProp;
}

const Setting = ({ navigation }: SettingProps) => {
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Text></Text>
        <Button onPress={() => navigation.replace("Auth")}>Đăng xuất</Button>
      </View>
    </AppWrapper>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
