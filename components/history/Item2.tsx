import React, { type FC } from "react";
import { Text, View } from "react-native";
import { Booking } from "../../api";
import { Avatar, Badge, Button, Divider } from "@rneui/themed";
import { IMAGE } from "../../constants/image";
import { COLOR } from "../../constants/color";
import dayjs from "dayjs";

interface ItemProps {
  booking: Booking;
}

const Item: FC<ItemProps> = (props) => {
  const { booking } = props;
  const { price, createdAt, driver } = booking;
  return (
    <View style={{ backgroundColor: "#e0efff67", padding: 5, borderRadius: 5 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        {driver && (
          <Avatar
            size={25}
            avatarStyle={{
              resizeMode: "contain",
              width: 25,
              height: 25,
              borderWidth: 0.3,
              borderColor: COLOR.secondary,
            }}
            rounded
            source={driver.avatar ? { uri: driver.avatar } : IMAGE.avatar}
          />
        )}
        {driver && (
          <Text
            style={{ color: COLOR.secondary, fontSize: 12, fontWeight: "500" }}
          >
            {driver.fullName}
          </Text>
        )}
        <Text
          style={{
            flex: 1,
            textAlign: "right",
            color: COLOR.secondary,
            fontSize: 12,
          }}
        >
          {dayjs(createdAt).format("hh:mm")}
        </Text>
      </View>
      <Divider
        color="#EBF0FA"
        width={1}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            numberOfLines={1}
            style={{ fontSize: 12, color: COLOR.dark }}
          >
            Số nhà 31, ngõ 22, TQB, HN
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: 12, color: COLOR.dark }}
          >
            57 Huỳnh Thúc Kháng
          </Text>
        </View>
        <Button
          type="clear"
          titleStyle={{ fontSize: 13 }}
        >
          Xem chi tiết
        </Button>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontWeight: "500", fontSize: 18, color: COLOR.error }}>
          - {price.toLocaleString("vi")}đ
        </Text>
        <View>
          <Badge value="Thành công" />
        </View>
      </View>
    </View>
  );
};

export default Item;
