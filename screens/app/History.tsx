import { Dialog, Divider } from "@rneui/themed";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import Filter from "../../components/history/Filter";
import Items from "../../components/history/Items";
import Statistic from "../../components/history/Statistic";
import type { AuthNavigationProp } from "../../types/navigation";
import useGetRequests from "../../hook/useGetRequests";

interface HistoryProps {
  navigation: AuthNavigationProp;
}
const History = ({}: HistoryProps) => {
  const [value, setValue] = useState(dayjs());
  const [open, setOpen] = useState(false);
  const { data, isPending, fetchData } = useGetRequests();
  const statistic = useMemo(() => {
    return {
      totalPrice: data.reduce((a, b) => a + b.price, 0),
      totalTravle: data.length,
    };
  }, [data]);
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Statistic {...statistic} />
        <Card style={{ height: 510 }}>
          <Filter time={value} />
          <Divider width={0.5} />
          <Items
            loading={isPending}
            data={data}
            onRequestRefresh={fetchData}
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
              setValue(dayjs(value));
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
// const data: ItemProps[] = [
//   {
//     id: "1",
//     price: 1000000,
//     time: new Date("2021-09-01"),
//     type: "done",
//   },
//   {
//     id: "2",
//     price: 100000,
//     time: new Date("2021-09-02"),
//     type: "userCancel",
//   },
//   {
//     id: "3",
//     price: 1000,
//     time: new Date("2021-09-03"),
//     type: "adminCancel",
//   },
//   {
//     id: "4",
//     price: 100000,
//     time: new Date("2021-09-04"),
//     type: "done",
//   },
//   {
//     id: "5",
//     price: 200000,
//     time: new Date("2021-09-05"),
//     type: "userCancel",
//   },
//   {
//     id: "6",
//     price: 300000,
//     time: new Date("2021-09-06 19:09"),
//     type: "adminCancel",
//   },
//   {
//     id: "7",
//     price: 400000,
//     time: new Date("2021-09-07"),
//     type: "done",
//   },
//   {
//     id: "8",
//     price: 5000,
//     time: new Date("2021-09-08"),
//     type: "userCancel",
//   },
//   {
//     id: "9",
//     price: 6000,
//     time: new Date("2021-09-09"),
//     type: "adminCancel",
//   },
//   {
//     id: "10",
//     price: 7000,
//     time: new Date("2021-09-10"),
//     type: "done",
//   },
//   {
//     id: "11",
//     price: 8000,
//     time: new Date("2021-09-11"),
//     type: "userCancel",
//   },
//   {
//     id: "12",
//     price: 9000,
//     time: new Date("2021-09-12"),
//     type: "adminCancel",
//   },
//   {
//     id: "13",
//     price: 10000,
//     time: new Date("2021-09-13"),
//     type: "done",
//   },
// ];
