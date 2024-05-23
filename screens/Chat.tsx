import React, { type FC } from "react";
import { View } from "react-native";
import { RootNavigationProp } from "../types/navigation";

interface ChatProps {
  navigation: RootNavigationProp;
}

const Chat: FC<ChatProps> = ({}) => {
  return <View></View>;
};

export default Chat;
