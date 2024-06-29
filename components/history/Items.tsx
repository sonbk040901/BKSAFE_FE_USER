import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Booking } from "../../api";
import Item from "./Item2";

interface ItemsProps {
  data: Booking[];
  loading?: boolean;
  onSelected?: (item: Booking) => void;
  onRequestRefresh: () => void;
}

const Items = (props: ItemsProps) => {
  const { data, onRequestRefresh, loading = true } = props;

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRequestRefresh}
          />
        }
        style={{ width: "100%" }}
        contentContainerStyle={{ gap: 5 }}
        data={data}
        renderItem={({ item }) => (
          <Item
            booking={item}
            // onPress={() => {
            //   if (onSelected) {
            //     onSelected(data.item);
            //   }
            // }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
