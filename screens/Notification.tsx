import React, { type FC } from "react";
import { Text, View } from "react-native";
import { RootNavigationProp } from "../types/navigation";

interface NotificationProps {
  navigation: RootNavigationProp;
}

const Notification: FC<NotificationProps> = ({}) => {
  return (
    <View>
      <Text>Notification</Text>
    </View>
  );
};

export default Notification;
