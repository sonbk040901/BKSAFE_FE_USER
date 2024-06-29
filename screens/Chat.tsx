import { Button } from "@rneui/themed";
import dayjs from "dayjs";
import { StatusBar } from "expo-status-bar";
import React, { useState, type FC } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Chat as ChatType } from "../api";
import { COLOR } from "../constants/color";
import { RootNavigationProp } from "../types/navigation";

interface ChatProps {
  navigation: RootNavigationProp;
}
const channels: Omit<ChatType, "user">[] = [
  {
    id: 1,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sunt commodi error molestias atque aspernatur harum obcaecati omnis esse pariatur.",
    createdAt: "2021-10-10T10:10:10Z",
    driver: {
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
    },
    driverId: 1,
    userId: 1,
  },
  {
    id: 2,
    message: "Tôi là lái xe, hẹn bạn ở đâu?",
    createdAt: "2021-10-10T10:10:10Z",
    driver: {
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
    },
    driverId: 1,
    userId: 1,
  },
];
const Chat: FC<ChatProps> = ({ navigation }) => {
  const renderItem = ({ item }: { item: (typeof channels)[number] }) => (
    <TouchableOpacity
      style={{
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => navigation.push("DetailChat", { driverId: 1 })}
    >
      <Image
        src={item.driver.avatar}
        style={{ width: 60, height: 60, borderRadius: 30, marginRight: 10 }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignSelf: "stretch",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 20, color: COLOR.dark }}>
            {item.driver.fullName}
          </Text>
          <Text
            style={{ fontSize: 12, color: COLOR.secondary, fontWeight: "600" }}
          >
            {dayjs(item.createdAt).format("HH:mm")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text
            style={{ color: COLOR.secondary, flex: 1 }}
            numberOfLines={1}
          >
            {item.message}
          </Text>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: COLOR.warning,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>
              5
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
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
          Danh sách tin nhắn
        </Text>
      </View>
      <FlatList
        refreshing={loading}
        onRefresh={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        }}
        data={channels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Chat;
