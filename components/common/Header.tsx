import { Button } from "@rneui/themed";
import * as React from "react";
import { Text, View } from "react-native";
import { COLOR } from "../../constants/color";
import { RootNavigationProp } from "../../types/navigation";

interface HeaderProps {
  navigation: RootNavigationProp;
  title: string;
}

const Header = (props: HeaderProps) => {
  const { navigation, title } = props;
  return (
    <View
      style={{
        height: 100,
        backgroundColor: COLOR.primaryBackground,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 40,
      }}
    >
      <View
        style={{
          position: "absolute",
          left: 7,
          top: 48,
          height: "100%",
        }}
      >
        <Button
          icon={{
            name: "arrow-back-outline",
            type: "ionicon",
            color: COLOR.primary,
            size: 30,
          }}
          type="clear"
          raised
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text
        style={{
          fontWeight: "600",
          fontSize: 25,
          color: COLOR.primary,
          // textTransform: "uppercase",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Header;
