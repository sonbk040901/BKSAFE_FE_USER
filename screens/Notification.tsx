import React, { type FC } from "react";
import { View } from "react-native";
import Header from "../components/common/Header";
import PersonalNotis from "../components/notification/PersonalNotis";
import { RootNavigationProp } from "../types/navigation";
interface NotificationProps {
  navigation: RootNavigationProp;
}

const Notification: FC<NotificationProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        navigation={navigation}
        title="Thông báo"
      />
      <PersonalNotis />
    </View>
  );
};

export default Notification;
