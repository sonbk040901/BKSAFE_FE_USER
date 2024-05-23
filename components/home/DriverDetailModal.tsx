import { Avatar, Button, Dialog, Text } from "@rneui/themed";
import React, { type FC } from "react";
import { Linking, View } from "react-native";
import { Rating } from "react-native-ratings";
import { COLOR } from "../../constants/color";
import { useAppDispatch, useAppSelector } from "../../states";
import { patchDriverId, selectDriver } from "../../states/slice/driver";

interface DriverDetailModalProps {}

const DriverDetailModal: FC<DriverDetailModalProps> = () => {
  const dispatch = useAppDispatch();
  const { info } = useAppSelector(selectDriver);
  const { fullName, avatar, rating, phone } = info || {};
  const isVisible = !!info;
  const handleClose = () => {
    dispatch(patchDriverId());
  };
  return (
    <Dialog
      isVisible={isVisible}
      statusBarTranslucent
      onRequestClose={handleClose}
      onBackdropPress={handleClose}
      animationType="fade"
    >
      <View
        style={{
          backgroundColor: COLOR.primay100,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            padding: 5,
          }}
        >
          <Avatar
            size={120}
            avatarStyle={{
              resizeMode: "contain",
              width: 120,
              height: 120,
              borderColor: "white",
              borderWidth: 1,
            }}
            rounded
            source={
              avatar
                ? {
                    uri: avatar,
                  }
                : require("../../assets/images/avatar.png")
            }
          />
          <Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>
            {fullName}
          </Text>

          <Rating
            minValue={1}
            startingValue={rating}
            tintColor={COLOR.primay100}
            readonly
          />
        </View>
      </View>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            backgroundColor: COLOR.secondaryBackground,
            paddingVertical: 5,
            flexDirection: "row",
          }}
        >
          <Button
            type="clear"
            title="Gọi"
            icon={{
              name: "phone",
              color: "white",
            }}
            titleStyle={{ color: "white" }}
            containerStyle={{ flex: 1 }}
            onPress={() => {
              Linking.openURL(`tel:${phone}`);
            }}
          />
          <Button
            type="clear"
            title="Nhắn tin"
            icon={{
              name: "message",
              color: "white",
            }}
            titleStyle={{ color: "white" }}
            containerStyle={{ flex: 1 }}
            onPress={() => {}}
          />
        </View>
      </View>
    </Dialog>
  );
};

export default DriverDetailModal;
