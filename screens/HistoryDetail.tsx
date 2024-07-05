import { Avatar, Button } from "@rneui/themed";
import React, { type FC } from "react";
import { Text, View } from "react-native";
import { COLOR } from "../constants/color";
import { RootNavigationProp } from "../types/navigation";
import Card from "../components/Card";
import { useFetch } from "../api/hook";
import { bookingApi } from "../api";
import { IMAGE } from "../constants/image";
interface HistoryDetailProps {
  navigation: RootNavigationProp;
  route: { params: { bookingId: number } };
}

const HistoryDetail: FC<HistoryDetailProps> = ({ navigation, route }) => {
  const { bookingId } = route.params;
  const { data } = useFetch({
    fetchFn: () => bookingApi.getOne(bookingId),
  });
  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const { driver } = data;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          Chi tiết chuyến đi
        </Text>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Card
          radius={5}
          style={{ width: "95%" }}
        >
          {driver && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Avatar
                size={50}
                rounded
                source={driver.avatar ? { uri: driver.avatar } : IMAGE.avatar}
              />
              <Text
                style={{
                  color: COLOR.secondary,
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                {driver.fullName}
              </Text>
            </View>
          )}
        </Card>
      </View>
    </View>
  );
};

export default HistoryDetail;
