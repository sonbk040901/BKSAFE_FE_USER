import { Button, Text } from "@rneui/themed";
import React, { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useRecentsBooking } from "../../api/hook";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import TravelCard from "../../components/home/TravelCard";
import { COLOR } from "../../constants/color";
import type { AppNavigationProp } from "../../types/navigation";
interface HomeProps {
  navigation: AppNavigationProp;
}
const Home: FC<HomeProps> = ({ navigation }) => {
  const { data, refetch, status } = useRecentsBooking();
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Xin chào, Lê Đức Sơn!</Text>
          <View style={styles.cardContent}>
            <Text style={styles.text}>Bạn muốn có một chuyến đi an toàn?</Text>
            <Text style={styles.text}>Hãy sử dụng BKSafe!</Text>
          </View>
          <Text style={styles.cardAction}>
            <Button
              title={
                data?.current
                  ? "Xem chuyến đi hiện tại"
                  : "Thuê tài xế ngay bây giờ"
              }
              radius="md"
              buttonStyle={{ backgroundColor: COLOR.primary }}
              onPress={() => {
                navigation.push("Map", { data: data?.current ?? null });
              }}
              icon={{
                name: "chevron-right",
                size: 20,
                color: "white",
                type: "feather",
              }}
              iconRight
            />
          </Text>
        </Card>
        <ScrollView
          style={{
            flex: 1,
            width: "100%",
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={status === "loading"}
              onRefresh={refetch}
            />
          }
        >
          {data && (
            <View
              style={{ alignItems: "center", gap: 20, paddingVertical: 20 }}
            >
              <TravelCard
                title="Chuyến đi hiện tại"
                data={data.current}
                onPress={() => navigation.push("Map", { data: data.current })}
              />
              {data.recent && (
                <TravelCard
                  title="Chuyến đi trước"
                  data={data.recent}
                  onPress={() =>
                    navigation.push("Map", {
                      data: data.recent,
                    })
                  }
                />
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  card: {
    alignItems: "center",
    gap: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  cardAction: {},
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 7,
    elevation: 5,
  },
});
