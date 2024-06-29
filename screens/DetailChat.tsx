import { Button, Icon } from "@rneui/themed";
import React, { useState, type FC } from "react";
import { Image, Text, TextInput, View } from "react-native";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { Driver } from "../api";
import { COLOR } from "../constants/color";
import { DetailChatRouteProp, RootNavigationProp } from "../types/navigation";

interface DetailChatProps {
  navigation: RootNavigationProp;
  route: DetailChatRouteProp;
}

const DetailChat: FC<DetailChatProps> = (props) => {
  const { navigation } = props;
  const [driver] = useState<Driver>({
    id: 1,
    createdAt: "2021-10-10T10:10:10Z",
    updatedAt: "2021-10-10T10:10:10",
    fullName: "Nguyễn Văn A",
    email: "nv.A@gmail.com",
    phone: "0123456789",
    address: "Hà Nội",
    avatar:
      "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/283416193_1186258168615880_4061551989491517514_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGzJ43Rph5pIA75SeyEJ2bkUyfKO-Z6bclTJ8o75nptyftB9-zgpts4QZ5kN844SVBVrW11e6lkl_DD2_C0xFXJ&_nc_ohc=XQyYJl2E2AQQ7kNvgFA-WVw&_nc_ht=scontent.fhan14-2.fna&oh=00_AYCW_2E9tRyH71ywUUb-v8toNNcbAdzp40Z39kzb5PPxLw&oe=6685F444",
    birthday: "2000-10-10",
    gender: "FEMALE",
    location: {
      address: "Hà Nội",
      latitude: 21.028511,
      longitude: 105.804817,
    },
    rating: 4.5,
  });
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      createdAt: new Date(),
      text: "Hello",
      user: { _id: 1, name: "React Native", avatar: driver.avatar },
    },
    {
      _id: 2,
      createdAt: new Date(),
      text: "Hello",
      user: { _id: 2, name: "React Native", avatar: driver.avatar },
    },
  ]);
  return (
    <View style={{ backgroundColor: "white", flex: 1, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          paddingTop: 20,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E5E5",
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
        <Image
          src={driver.avatar}
          style={{ width: 50, height: 50, borderRadius: 35, marginRight: 10 }}
        />
        <View>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
              color: COLOR.dark,
            }}
          >
            {driver.fullName}
          </Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        locale="vi"
        alwaysShowSend
        placeholder="Nhập tin nhắn..."
        showUserAvatar={false}
        showAvatarForEveryMessage={false}
        user={{ _id: 2, name: "React Native", avatar: driver.avatar }}
        renderSend={(props) => {
          return (
            <Send {...props}>
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  type="material-community"
                  name="send-circle"
                  color={props.text ? COLOR.primary : COLOR.primaryBackground}
                  size={37}
                />
              </View>
            </Send>
          );
        }}
        onSend={(newMessages) => {
          setMessages([...newMessages, ...messages]);
        }}
        renderFooter={() => <View style={{ height: 30 }}></View>}
        renderInputToolbar={(props) => {
          return (
            <InputToolbar
              {...props}
              primaryStyle={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F5F5F5",
                borderRadius: 20,
                padding: 0,
                paddingLeft: 10,
                paddingRight: 5,
                margin: 10,
              }}
            />
          );
        }}
        renderComposer={(props) => {
          const { text, placeholder, onTextChanged } = props;
          return (
            <TextInput
              autoFocus
              placeholder={placeholder}
              value={text}
              style={{ flex: 1 }}
              onChangeText={onTextChanged}
            />
          );
        }}
      />
    </View>
  );
};

export default DetailChat;
