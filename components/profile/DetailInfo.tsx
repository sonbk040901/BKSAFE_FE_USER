import React from "react";
import { StyleSheet } from "react-native";
import Card from "../Card";
import Item from "./Item";
// import { RectButton } from "react-native-gesture-handler";
// import { Button } from "@rneui/themed";

interface DetailInfoProps {}

const DetailInfo = (props: DetailInfoProps) => {
  const {} = props;
  return (
    <Card style={styles.container}>
      <Item
        name="user"
        content="Lê Đức Sơn"
      />
      <Item
        name="mail"
        content="leducson007@gmail.com"
      />
      <Item
        name="phone"
        content="0353763088"
      />
      <Item
        name="map-pin"
        content="Hà Nội"
      />
      <Item
        name="calendar"
        content="01/01/2001"
      />
    </Card>
  );
};

export default DetailInfo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
});
