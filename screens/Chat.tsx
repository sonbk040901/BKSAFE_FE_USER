import dayjs from "dayjs";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, type FC } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Chat as ChatType, chatApi } from "../api";
import { useFetch } from "../api/hook";
import Header from "../components/common/Header";
import { COLOR } from "../constants/color";
import { subcribe } from "../socket";
import { RootNavigationProp } from "../types/navigation";

interface ChatProps {
  navigation: RootNavigationProp;
}
const Chat: FC<ChatProps> = ({ navigation }) => {
  const { data, isLoading, refetch } = useFetch({
    fetchFn: chatApi.getChats,
    initialData: [],
  });
  useEffect(() => {
    return subcribe("chat/new-chat", refetch);
  }, [refetch]);
  const renderItem = ({ item }: { item: ChatType }) => (
    <TouchableOpacity
      style={{
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => navigation.push("DetailChat", { driverId: item.driverId })}
    >
      <Image
        src={item.driver.avatar ?? undefined}
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
            {!item.isDriver && <Text style={{ fontWeight: "600" }}>Bạn: </Text>}
            {item.message}
          </Text>
          {/* <View
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
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <Header
        navigation={navigation}
        title="Tin nhắn"
      />
      <FlatList
        refreshing={isLoading}
        onRefresh={refetch}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Chat;
