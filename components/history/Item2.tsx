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
  onPress?: () => void;
}

const Item: FC<ItemProps> = (props) => {
  const { booking, onPress } = props;
  const { price, createdAt, driver, status } = booking;
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          flex: 1,
          textAlign: "right",
          color: COLOR.secondary,
          fontSize: 11,
          fontWeight: "500",
          paddingRight: 5,
        }}
      >
        {dayjs(createdAt).format("hh:mm")}
      </Text>
      <View
        style={{
          padding: 7,
          borderRadius: 5,
          borderColor: COLOR.primaryBackground,
          borderWidth: 0.3,
          gap: 5,
          backgroundColor: "#a9d1ff21",
        }}
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
              rounded
              source={driver.avatar ? { uri: driver.avatar } : IMAGE.avatar}
            />
          )}
          {driver && (
            <Text
              style={{
                color: COLOR.secondary,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              {driver.fullName}
            </Text>
          )}
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 2,
            }}
            onPress={onPress}
          >
            <Text
              style={{
                textAlign: "right",
                fontSize: 13,
                fontWeight: "500",
                color: COLOR.primary,
              }}
            >
              Xem chi tiết
            </Text>
          </TouchableOpacity>
        </View>
        <Divider
          color="#EBF0FA"
          width={1}
        />
        <View style={{ gap: 3 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              color: COLOR.secondary,
              fontWeight: "500",
            }}
          >
            <Text style={{ color: COLOR.secondary2, fontSize: 9 }}>Từ:</Text>{" "}
            {booking.locations[0].address}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 11,
              color: COLOR.secondary,
              fontWeight: "500",
            }}
          >
            <Text style={{ color: COLOR.secondary2, fontSize: 9 }}>Đến:</Text>{" "}
            {booking.locations[booking.locations.length - 1].address}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontWeight: "600", fontSize: 15, color: COLOR.warning }}
          >
            {price.toLocaleString("vi")} VNĐ
          </Text>
          <Badge
            icon=""
            value={status === "COMPLETED" ? "Thành công" : "Đã hủy"}
            type={status === "COMPLETED" ? "success" : "warning"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
