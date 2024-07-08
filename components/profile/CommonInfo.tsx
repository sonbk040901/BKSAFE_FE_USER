import { Avatar, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "../../constants/color";
import { useAppSelector } from "../../states";
import { selectProfile } from "../../states/slice/profile";
import Card from "../Card";

const CommonInfo = () => {
  const { avatar, fullName, phone } = useAppSelector(selectProfile);
  return (
    <Card style={styles.container}>
      <View>
        <Avatar
          size={50}
          source={avatar ? { uri: avatar } : undefined}
          avatarStyle={styles.avatar}
        />
        <View
          style={{
            position: "absolute",
            bottom: -5,
            right: -5,
            backgroundColor: COLOR.primary,
            padding: 3,
            borderRadius: 50,
          }}
        >
          <Icon
            size={12}
            name="edit"
            color={COLOR.white}
          />
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.email}>{phone}</Text>
      </View>
      {/* <RectButton
        style={styles.button}
        rippleColor="#b6b6b64f"
      >
        <Text style={{ color: COLOR.primary, fontWeight: "500" }}>Sửa</Text>
      </RectButton> */}
    </Card>
  );
};

export default CommonInfo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  info: { justifyContent: "center", alignItems: "flex-start", flex: 1 },
  name: { fontWeight: "bold", fontSize: 20 },
  email: {
    fontWeight: "500",
    fontSize: 15,
    color: COLOR.secondary2,
    textTransform: "lowercase",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.primaryBackground,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
