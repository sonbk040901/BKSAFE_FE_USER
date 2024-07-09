import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FindAllBookingDTO } from "../../api/booking";
import useBookings from "../../api/hook/useBookings";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import Filter from "../../components/history/Filter";
import Items from "../../components/history/Items";
import Statistic from "../../components/history/Statistic";
import type { RootNavigationProp } from "../../types/navigation";

interface HistoryProps {
  navigation: RootNavigationProp;
}
const History = ({ navigation }: HistoryProps) => {
  const [filter, setFilter] = useState<FindAllBookingDTO>({});
  const {
    data: { data: bookings },
    isLoading,
    refetch,
  } = useBookings(filter);
  const statistic = useMemo(() => {
    const completedTravle = bookings.filter(
      (item) => item.status === "COMPLETED",
    );
    const canceledBookings = bookings.filter(
      (item) => item.status === "CANCELLED",
    );
    const totalPrice = completedTravle.reduce((a, b) => a + b.price, 0);
    return {
      totalPrice,
      totalTravle: bookings.length,
      completedTravle: completedTravle.length,
      canceledTravle: canceledBookings.length,
    };
  }, [bookings]);
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Statistic {...statistic} />
        <Card style={{ height: 550, flex: 1 }}>
          <Filter
            time={filter.time ? dayjs(filter.time) : dayjs()}
            onChange={(time, status) => {
              setFilter({ ...filter, time: time.format("YYYY-MM-DD"), status });
            }}
          />
          <Items
            loading={isLoading}
            data={bookings}
            navigation={navigation}
            onRequestRefresh={refetch}
          />
        </Card>
      </View>
    </AppWrapper>
  );
};
export default History;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: 20,
    paddingBottom: 20,
  },
});
