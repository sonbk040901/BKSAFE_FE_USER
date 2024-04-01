import React, { useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import Card from "../Card";
import { Avatar, Button, Divider, Icon, Skeleton } from "@rneui/themed";
import { COLOR } from "../../constants/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { Booking, BookingStatus } from "../../api";
type CardTravelProps = {
  title: string;
  data: Nullable<Booking>;
  onPress?: () => void;
};
type DriverProps = {
  avatar?: string;
  name: string;
  star: number;
};
const statusMapping: Record<BookingStatus | "none", string> = {
  none: "Thuê tài xế?",
  PENDING: "Đang tìm tài xế phù hợp...",
  ACCEPTED: "Tài xế đang trên đường tới...",
  // driving: (next: string) => `Điểm đến tiếp theo: ${next}`,
  DRIVING: "Chuyến đi đang diễn ra...",
  COMPLETED: "Chuyến đi đã hoàn thành",
  REJECTED: "Tài xế đã từ chối chuyến đi",
  CANCELLED: "Chuyến đi đã bị hủy",
};
const CardTravel = (props: CardTravelProps) => {
  const { title, onPress, data } = props;
  const status = data?.status || "none";
  const footerTitle = statusMapping[status];
  return (
    <Card style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerTitle}>{title}</Text>
        {status !== "none" ? (
          <Button
            title="Chi tiết"
            radius="md"
            buttonStyle={{
              backgroundColor: COLOR.primaryBackground,
              paddingHorizontal: 20,
            }}
            titleStyle={{ color: COLOR.primary }}
            onPress={onPress}
          />
        ) : null}
      </View>
      <View style={styles.body}>
        {status === "none" ? (
          <CardBodyNone />
        ) : (
          <View style={{ gap: 10 }}>
            <MiniMap />

            <DriverInfo
              driverProps={
                (data?.driver && {
                  avatar: data.driver.avatar,
                  name: data.driver.fullName,
                  star: data.driver?.rating,
                }) ||
                undefined
              }
            />
          </View>
        )}
      </View>
      {status !== "COMPLETED" && (
        <>
          <Divider
            color="#EBF0FA"
            width={0.75}
          />
          <TouchableOpacity onPress={onPress}>
            <View style={styles.footer}>
              <Text
                style={[
                  styles.footerTitle,
                  styles[
                    status === "PENDING" || status === "ACCEPTED"
                      ? "footerTitleWarn"
                      : "footerTitleInfo"
                  ],
                ]}
              >
                {footerTitle}
              </Text>
              <Icon
                color={COLOR.primary}
                name={status === "none" ? "search" : "chevron-right"}
              />
            </View>
          </TouchableOpacity>
        </>
      )}
    </Card>
  );
};
const CardBodyNone = () => (
  <Text
    style={{
      fontSize: 16,
      color: "black",
      fontWeight: "bold",
    }}
  >
    Hiện tại bạn chưa có chuyến đi nào!
  </Text>
);
const MiniMap = () => {
  const mapRef = useRef<MapView>(null);
  return (
    <View style={styles.miniMap}>
      <MapView
        provider="google"
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        camera={{
          center: {
            latitude: 21.007326,
            longitude: 105.847328,
          },
          pitch: 0,
          heading: 0,
          altitude: 0,
          zoom: 15,
        }}
        style={{ width: "100%", height: "120%" }}
        ref={mapRef}
      ></MapView>
    </View>
  );
};
const DriverInfo = ({ driverProps }: { driverProps?: DriverProps }) => {
  const isSkeleton = !driverProps;
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {isSkeleton ? (
        <>
          <Skeleton
            circle
            width={50}
            height={50}
          />
          <Skeleton
            width={200}
            height={50}
            style={{ borderRadius: 10 }}
          />
        </>
      ) : (
        <>
          <Avatar
            size={50}
            avatarStyle={{
              resizeMode: "contain",
              width: 50,
              height: 50,
            }}
            rounded
            source={require("../../assets/images/avatar.png")}
          />
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {driverProps.name}
            </Text>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}
            >
              <Icon
                name="star"
                type="feather"
                size={16}
              />
              <Text style={{ fontSize: 16 }}>{driverProps.star}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};
export default CardTravel;
const styles = StyleSheet.create({
  container: {},
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    paddingVertical: 15,
  },
  footer: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    alignItems: "flex-end",
  },
  footerTitleInfo: {
    color: COLOR.primary,
  },
  footerTitleWarn: {
    color: COLOR.warning,
  },
  miniMap: {
    height: 150,
    width: "100%",
    backgroundColor: "#afafafc6",
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#afafafc6",
    borderWidth: 0.2,
  },
});
