import React, { useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import Card from "../Card";
import { Avatar, Button, Divider, Icon, Image, Skeleton } from "@rneui/themed";
import { COLOR } from "../../constants/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { Booking, BookingStatus, Driver } from "../../api";
import MapViewDirections from "react-native-maps-directions";
import { getApiKey } from "../../api/ggmap";
import { useAppDispatch } from "../../states";
import { patchDriverInfo } from "../../states/slice/driver";
import { IMAGE } from "../../constants/image";
type CardTravelProps = {
  title: string;
  data: Nullable<Booking>;
  viewOnly?: boolean;
  onPress?: () => void;
};
type DriverProps = Driver;
const statusMapping: Record<BookingStatus | "none", string> = {
  none: "Thuê tài xế?",
  PENDING: "Đang tìm tài xế phù hợp...",
  ACCEPTED: "Đang tìm tài xế phù hợp...",
  RECEIVED: "Tài xế đang trên đường tới...",
  // driving: (next: string) => `Điểm đến tiếp theo: ${next}`,
  DRIVING: "Chuyến đi đang diễn ra...",
  COMPLETED: "Chuyến đi đã hoàn thành",
  REJECTED: "Tài xế đã từ chối chuyến đi",
  CANCELLED: "Chuyến đi đã bị hủy",
  TIMEOUT: "Hết thời gian chờ",
};
const CardTravel = (props: CardTravelProps) => {
  const { title, onPress, data, viewOnly = false } = props;
  const status = data?.status || "none";
  const footerTitle = statusMapping[status];
  const nextLocation = data?.locations?.find(
    (l) => l.id === data.nextLocationId,
  );
  return (
    <Card style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerTitle}>{title}</Text>
        {status !== "none" && !viewOnly ? (
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
            <MiniMap booking={data} />
            <DriverInfo driverProps={data?.driver ?? undefined} />
          </View>
        )}
      </View>
      {status !== "COMPLETED" && (
        <>
          <Divider
            color="#EBF0FA"
            width={0.75}
          />
          <TouchableOpacity
            onPress={() => {
              if (viewOnly) return;
              onPress?.();
            }}
          >
            <View style={styles.footer}>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.footerTitle,
                    styles[
                      status === "PENDING" || status === "RECEIVED"
                        ? "footerTitleWarn"
                        : "footerTitleInfo"
                    ],
                  ]}
                >
                  {status !== "DRIVING" ? footerTitle : "Điểm đến tiếp theo"}
                </Text>
                {nextLocation && (
                  <Text
                    style={{ fontSize: 8, color: COLOR.secondary }}
                    numberOfLines={1}
                  >
                    {nextLocation.address}
                  </Text>
                )}
              </View>
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
const MiniMap = ({ booking }: { booking: Nullable<Booking> }) => {
  const { locations } = booking ?? {};
  const mapRef = useRef<MapView>(null);
  useEffect(() => {
    if (locations) {
      const sto = setTimeout(() => {
        mapRef.current?.fitToCoordinates(locations, {
          edgePadding: {
            top: 35,
            right: 35,
            bottom: 35,
            left: 35,
          },
          animated: true,
        });
      }, 1000);
      return () => clearTimeout(sto);
    }
  }, [locations]);
  return (
    <View style={styles.miniMap}>
      <MapView
        provider="google"
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        camera={{
          center: locations
            ? locations[0]
            : {
                latitude: 21.007326,
                longitude: 105.847328,
              },
          pitch: 0,
          heading: 0,
          zoom: 13,
        }}
        style={{ width: "100%", height: "120%" }}
        ref={mapRef}
      >
        {locations && (
          <MapViewDirections
            apikey={getApiKey()}
            region="vn"
            language="vi"
            timePrecision="now"
            origin={locations[0]}
            destination={locations[locations.length - 1]}
            strokeWidth={3}
            strokeColor={"#007bff"}
            waypoints={locations.slice(1, locations.length - 1)}
            geodesic
            mode="DRIVING"
          />
        )}
        {locations?.map((loc) => {
          const source =
            loc.type === "PICKUP"
              ? IMAGE.pin
              : loc.type === "DROP_OFF"
              ? IMAGE.homePin
              : IMAGE.downPin;
          return (
            <Marker
              key={loc.id}
              coordinate={loc}
              style={{ width: 20, height: 20 }}
              title={loc.address}
            >
              <Image
                source={source}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};
const DriverInfo = ({ driverProps }: { driverProps?: DriverProps }) => {
  const dispatch = useAppDispatch();
  const { gender } = driverProps || {};
  const isSkeleton = !driverProps;
  const handleSelectDriver = () => {
    dispatch(patchDriverInfo(driverProps));
  };
  return (
    <View>
      {isSkeleton ? (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Skeleton
            circle
            width={50}
            height={50}
            style={{ opacity: 0.3 }}
          />
          <Skeleton
            height={50}
            style={{ borderRadius: 7, opacity: 0.3, flex: 1 }}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
          onPress={handleSelectDriver}
        >
          <Avatar
            size={50}
            avatarStyle={{
              resizeMode: "contain",
              width: 50,
              height: 50,
            }}
            rounded
            source={
              driverProps.avatar ? { uri: driverProps.avatar } : IMAGE.avatar
            }
          />
          <View style={{ justifyContent: "center", flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {driverProps.fullName}
              </Text>
              {gender === "MALE" ? (
                <Icon
                  name="male"
                  size={19}
                  color={COLOR.primary}
                />
              ) : gender === "FEMALE" ? (
                <Icon
                  name="female"
                  size={19}
                  color="hotpink"
                />
              ) : null}
            </View>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "baseline" }}
            >
              <Icon
                name="star"
                type="feather"
                size={16}
                color={COLOR.warning}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: COLOR.warning,
                }}
              >
                {+driverProps.rating.toFixed(2)}
              </Text>
            </View>
          </View>
          <Icon
            name="more-vertical"
            type="feather"
            size={20}
            color={COLOR.secondary}
          />
        </TouchableOpacity>
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
    paddingBottom: 5,
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
    fontSize: 17,
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
