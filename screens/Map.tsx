/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dialog, Icon, Text } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Animated from "react-native-reanimated";
import { API_KEY } from "../api/ggmap";
import useCalculateCost from "../api/hook/useCalculateCost";
import useFindDriver from "../api/hook/useFindDriver";
import PostionsBar from "../components/map/PositionsBar";
import { COLOR } from "../constants/color";
import { IMAGE } from "../constants/image";
import useCreateRequest from "../hook/useCreateRequest";
import useLocation from "../hook/useLocation";
import useOpacityStyle from "../hook/useOpacityStyle";
import usePosition from "../hook/usePosition";
import { MapRouteProp, RootNavigationProp } from "../types/navigation";

interface MapProps {
  navigation: RootNavigationProp;
  route: MapRouteProp;
}

const Map = ({ navigation, route }: MapProps) => {
  const data = route.params?.data;
  const [isEdit, setIsEdit] = useState(!data);
  const location = useLocation(!isEdit);
  const { money, status, calculate } = useCalculateCost();
  const { status: createRequestStatus, createRequest } = useCreateRequest();
  const { positions, addAddress, addLocation, remove, replace } = usePosition(
    data?.locations,
  );
  const { drivers } = useFindDriver({
    location: positions[0],
    autoFetch: isEdit,
  });
  const [opacityStyle, setShowContent] = useOpacityStyle();
  const mapRef = React.useRef<MapView>(null);
  // hide all content when drag map
  const handlePanDrag = () => setShowContent(false);
  const handlePanDragEnd = () => setShowContent(true);
  //
  const [distance, setDistance] = useState<number>(0);
  const handleCreateRequest = () => {
    const [l1, ...rest] = positions;
    const l2 = rest[rest.length - 1];
    rest.pop();
    createRequest({
      distance,
      pickup: l1,
      dropOff: l2,
      stops: rest,
    });
  };

  useEffect(() => {
    if (!location) return;
    addLocation(location);
    mapRef.current?.animateCamera(
      {
        center: location,
        pitch: 0,
        heading: 0,
        altitude: 0,
        zoom: 15,
      },
      { duration: 1500 },
    );
  }, [addLocation, location]);
  useEffect(() => {
    if (positions.length < 2 || !isEdit) return;
    const sto = setTimeout(() => {
      calculate({
        distance,
        numberOfWaypoints: positions.length - 2,
      });
    }, 300);
    return () => clearTimeout(sto);
  }, [calculate, distance, positions, isEdit]);
  useEffect(() => {
    if (positions.length < 2) return;
    setTimeout(() => {
      mapRef.current?.fitToCoordinates(positions, {
        edgePadding: {
          top: 150 + 20 * positions.length,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }, 300);
  }, [positions]);
  useEffect(() => {
    if (createRequestStatus === "success") {
      setIsEdit(false);
    }
  }, [createRequestStatus]);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Dialog
        statusBarTranslucent
        isVisible={isEdit && !location}
        onRequestClose={() => navigation.goBack()}
      >
        <Dialog.Title
          titleStyle={{ textAlign: "center" }}
          title="Đang tìm vị trí của bạn..."
        />
        <Dialog.Loading />
      </Dialog>
      <Animated.View style={[styles.header, opacityStyle]}>
        <View style={{ alignSelf: "flex-start" }}>
          <Button
            icon={{
              name: "arrow-back-outline",
              type: "ionicon",
              color: COLOR.primary,
              size: 30,
            }}
            type="clear"
            raised
            onPress={() => navigation.goBack()}
          />
        </View>
        <PostionsBar
          visible={positions.length > 0}
          editable={isEdit}
          data={positions.map((p) => p.address)}
          onChange={replace}
          onAdd={addAddress}
          onRemove={remove}
        />
      </Animated.View>
      <MapView
        ref={mapRef}
        style={{ flex: 1, width: "100%" }}
        camera={{
          center: {
            latitude: 21.007326,
            longitude: 105.847328,
          },
          pitch: 0,
          heading: 0,
          altitude: 0,
          zoom: 12,
        }}
        onPanDrag={handlePanDrag}
        onRegionChangeComplete={handlePanDragEnd}
      >
        {positions.length > 1 && (
          <MapViewDirections
            apikey={API_KEY}
            region="vn"
            language="vi"
            timePrecision="now"
            origin={positions[0]}
            destination={positions[positions.length - 1]}
            strokeWidth={6}
            strokeColor={COLOR.primary}
            waypoints={positions.slice(1, positions.length - 1)}
            geodesic
            mode="DRIVING"
            onReady={({
              distance,
              duration,
              fares,
              waypointOrder,
              legs,
              coordinates,
            }) => {
              setDistance(distance);
              // console.log("Distance: ", distance);
              // console.log("Duration: ", duration);
              // console.log(waypointOrder, legs, coordinates);
            }}
          />
        )}
        {positions.map((p, i) => {
          const { address, ...location } = p;
          return (
            <Marker
              key={address}
              coordinate={location}
            >
              <Animated.Image
                source={
                  i == 0
                    ? IMAGE.pin
                    : i == positions.length - 1
                    ? IMAGE.homePin
                    : IMAGE.downPin
                }
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Marker>
          );
        })}
        {drivers.map((d) => (
          <Marker
            key={d.id}
            coordinate={d}
            image={IMAGE.driverPin}
          ></Marker>
        ))}
      </MapView>
      <Animated.View style={[styles.footer, opacityStyle]}>
        <Button
          radius="lg"
          disabledStyle={styles.disable}
          disabled={
            money === undefined || createRequestStatus === "pending" || !isEdit
          }
          onPress={handleCreateRequest}
        >
          <View style={[styles.submitBtn]}>
            <View style={styles.submitBtnTitleContainer}>
              {isEdit && <Text style={styles.text}>Tìm tài xế</Text>}
              <Text style={styles.money}>
                {money
                  ? `${money.toLocaleString()}đ`
                  : data?.price
                  ? `${Number(data?.price?.toFixed(0)).toLocaleString()}đ`
                  : null}
              </Text>
            </View>
            {isEdit && (
              <Icon
                name="arrow-forward-outline"
                type="ionicon"
                size={25}
                color="white"
              />
            )}
          </View>
        </Button>
      </Animated.View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffffff",
  },
  disable: {
    opacity: 0.7,
    backgroundColor: COLOR.primary,
  },
  header: {
    position: "absolute",
    top: 25,
    left: 2,
    zIndex: 999,
    alignItems: "center",
    width: "100%",
  },
  footer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 25,
    left: 2,
    zIndex: 999,
    alignItems: "center",
    width: "100%",
  },
  submitBtn: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  submitBtnTitleContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "baseline",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  money: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
