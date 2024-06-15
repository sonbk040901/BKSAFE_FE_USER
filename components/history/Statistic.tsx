import { Divider } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "../../constants/color";
import Card from "../Card";
import StatisticItem from "./StatisticItem";

interface StatisticProps {
  totalPrice: number;
  totalTravle: number;
  completedTravle: number;
  canceledTravle: number;
}

const Statistic = (props: StatisticProps) => {
  const { totalPrice, totalTravle, completedTravle, canceledTravle } = props;
  return (
    <Card style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Tổng thanh toán
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: COLOR.primary,
          }}
        >
          {totalPrice.toLocaleString()} VNĐ
        </Text>
      </View>
      <Divider
        color="#EBF0FA"
        width={1}
      />
      <View
        style={{
          paddingVertical: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <StatisticItem
            title="Tổng chuyến"
            count={totalTravle}
          />
          <StatisticItem
            title="Thành công"
            count={completedTravle}
          />
          <StatisticItem
            title="Chuyến hủy"
            count={canceledTravle}
          />
        </View>
      </View>
    </Card>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: { paddingBottom: 0 },
});
