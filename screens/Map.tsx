import { Button, Dialog } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Animated from "react-native-reanimated";
import { API_KEY } from "../api/ggmap";
import useFindDriver from "../api/hook/useFindDriver";
import Footer from "../components/map/Footer";
import PostionsBar from "../components/map/PositionsBar";
import { COLOR } from "../constants/color";
import { IMAGE } from "../constants/image";
import useLocation from "../hook/useLocation";
import useOpacityStyle from "../hook/useOpacityStyle";
import { useAppDispatch, useAppSelector } from "../states";
import {
  addLocation,
  calculatePrice,
  selectBooking,
  setDistance,
} from "../states/slice/booking";
import { MapRouteProp, RootNavigationProp } from "../types/navigation";

interface MapProps {
  navigation: RootNavigationProp;
  route: MapRouteProp;
}

const Map = ({ navigation }: MapProps) => {
  const { locations, id, distance } = useAppSelector(selectBooking);
  const dispatch = useAppDispatch();
  const { drivers } = useFindDriver({
    location: locations[0],
    autoFetch: !id,
  });
  const currentLocation = useLocation(locations[0]);
  const [opacityStyle, setShowContent] = useOpacityStyle();
  const mapRef = useRef<MapView>(null);
  // // hide all content when drag map
  const handlePanDrag = () => setShowContent(false);
  const handlePanDragEnd = () => setShowContent(true);
  useEffect(() => {
    if (!currentLocation || locations.length) return;
    dispatch(addLocation(currentLocation));
  }, [currentLocation, dispatch, locations.length]);
  useEffect(() => {
    if (locations.length === 0) return;
    const sto = setTimeout(() => {
      if (locations.length === 1) {
        dispatch(setDistance(0));
        mapRef.current?.animateCamera(
          {
            center: locations[0],
            pitch: 0,
            heading: 0,
            altitude: 0,
            zoom: 15,
          },
          { duration: 1500 },
        );
        return;
      }
      mapRef.current?.fitToCoordinates(locations, {
        edgePadding: {
          top: 150 + 20 * locations.length,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }, 300);
    return () => clearTimeout(sto);
  }, [dispatch, locations]);
  useEffect(() => {
    dispatch(calculatePrice());
  }, [dispatch, distance]);
  const dialogVisible = !id && locations.length === 0;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <Dialog
        statusBarTranslucent
        isVisible={dialogVisible}
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
        <PostionsBar />
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
        {locations.length > 1 && (
          <MapViewDirections
            apikey={API_KEY}
            region="vn"
            language="vi"
            timePrecision="now"
            origin={locations[0]}
            destination={locations[locations.length - 1]}
            strokeWidth={5}
            strokeColor={COLOR.primary}
            waypoints={locations.slice(1, locations.length - 1)}
            geodesic
            mode="DRIVING"
            onReady={({ distance }) => dispatch(setDistance(distance))}
          />
        )}
        {locations.map((p, i) => {
          const { address, ...location } = p;
          const source =
            i == 0
              ? IMAGE.pin
              : i == locations.length - 1
              ? IMAGE.homePin
              : IMAGE.downPin;
          const title =
            i == 0
              ? "Điểm đón"
              : i == locations.length - 1
              ? "Điểm đến"
              : "Điểm dừng";
          return (
            <Marker
              key={address}
              coordinate={location}
              title={title}
            >
              <Animated.Image
                source={source}
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
      <Footer style={opacityStyle} />
    </KeyboardAvoidingView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    height: "100%",
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
    bottom: 0,
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
