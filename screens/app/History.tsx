import { Dialog } from "@rneui/themed";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import useBookings from "../../api/hook/useBookings";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import Items from "../../components/history/Items";
import Statistic from "../../components/history/Statistic";
import type { RootNavigationProp } from "../../types/navigation";

interface HistoryProps {
  navigation: RootNavigationProp;
}
const History = ({ navigation }: HistoryProps) => {
  const [value, setValue] = useState(dayjs());
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState({});
  const {
    data: { data: bookings },
    isLoading,
    refetch,
  } = useBookings(filter);
  const statistic = useMemo(() => {
    return {
      totalPrice: bookings.reduce((a, b) => a + b.price, 0),
      totalTravle: bookings.length,
      completedTravle: bookings.filter((item) => item.status === "COMPLETED")
        .length,
      canceledTravle: bookings.filter((item) => item.status === "CANCELLED")
        .length,
    };
  }, [bookings]);
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Statistic {...statistic} />
        <Card style={{ height: 550 }}>
          {/* <Filter time={value} /> */}
          <Items
            loading={isLoading}
            data={bookings}
            navigation={navigation}
            onRequestRefresh={refetch}
          />
        </Card>
      </View>
      <Dialog
        isVisible={open}
        onRequestClose={() => setOpen(false)}
        animationType="fade"
        statusBarTranslucent
      >
        <View style={{ overflow: "scroll" }}>
          <DateTimePicker
            value={value}
            mode="date"
            onValueChange={(value) => {
              if (value) setValue(dayjs(value));
              setOpen(false);
            }}
          />
        </View>
      </Dialog>
    </AppWrapper>
  );
};
export default History;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: 20,
  },
});
