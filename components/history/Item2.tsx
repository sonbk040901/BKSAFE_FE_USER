import { Avatar, Divider } from "@rneui/themed";
import dayjs from "dayjs";
import React, { type FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Booking } from "../../api";
import { COLOR } from "../../constants/color";
import { IMAGE } from "../../constants/image";
import Badge from "../common/Badge";

interface ItemProps {
  booking: Booking;
}

const Item: FC<ItemProps> = (props) => {
  const { booking } = props;
  const { price, createdAt, driver, status } = booking;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#eff7ffff",
        padding: 7,
        borderRadius: 5,
        // borderColor: COLOR.primaryBackground,
        // borderWidth: 0.3,
      }}
      activeOpacity={0.7}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        {driver && (
          <Avatar
            size={25}
            avatarStyle={{
              resizeMode: "contain",
              width: 25,
              height: 25,
              // borderWidth: 0.3,
              // borderColor: COLOR.secondary,
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
            style={{ fontSize: 12, color: COLOR.dark, fontWeight: "500" }}
          >
            Số nhà 31, ngõ 22, TQB, HN
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: 12, color: COLOR.dark, fontWeight: "500" }}
          >
            57 Huỳnh Thúc Kháng
          </Text>
        </View>
        <Text style={{ fontSize: 13, fontWeight: "500", color: COLOR.primary }}>
          Xem chi tiết
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 17, color: COLOR.error }}>
          {price.toLocaleString("vi")} VNĐ
        </Text>
        <Badge
          icon=""
          value={status === "COMPLETED" ? "Thành công" : "Đã hủy"}
          type={status === "COMPLETED" ? "success" : "danger"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Item;
