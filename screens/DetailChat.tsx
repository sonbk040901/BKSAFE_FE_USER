import React, { type FC } from "react";
import { RootNavigationProp } from "../types/navigation";
import { View } from "react-native";

interface DetailChatProps {
  navigation: RootNavigationProp;
}

const DetailChat: FC<DetailChatProps> = (props) => {
  const {} = props;
  return <View></View>;
};

export default DetailChat;
