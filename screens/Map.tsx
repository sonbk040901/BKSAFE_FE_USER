import { Button, Dialog } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Animated from "react-native-reanimated";
import { API_KEY } from "../api/ggmap";
import Footer from "../components/map/Footer";
import PostionsBar from "../components/map/PositionsBar";
import { COLOR } from "../constants/color";
import { IMAGE } from "../constants/image";
import { MapProvider, useMapContext } from "../context/MapContext";
import useOpacityStyle from "../hook/useOpacityStyle";
import { MapRouteProp, RootNavigationProp } from "../types/navigation";

interface MapProps {
  navigation: RootNavigationProp;
  route: MapRouteProp;
}

const Map = ({ navigation }: MapProps) => {
  const {
    driverOnMaps,
    locations,
    currentLocation,
    // setNote,
    // setNotes,
    setDistance,
    viewOnly,
  } = useMapContext();
  const [opacityStyle, setShowContent] = useOpacityStyle();
  const mapRef = React.useRef<MapView>(null);
  // // hide all content when drag map
  const handlePanDrag = () => setShowContent(false);
  const handlePanDragEnd = () => setShowContent(true);
  useEffect(() => {
    if (!currentLocation) return;
    mapRef.current?.animateCamera(
      {
        center: currentLocation,
        pitch: 0,
        heading: 0,
        altitude: 0,
        zoom: 15,
      },
      { duration: 1500 },
    );
  }, [currentLocation]);
  useEffect(() => {
    if (locations.length < 2) return;
    setTimeout(() => {
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
  }, [locations]);
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
        isVisible={!viewOnly && !locations.length}
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
            onReady={({ distance }) => setDistance(distance)}
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
        {driverOnMaps?.map((d) => (
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

export default function MapWrapper(props: MapProps) {
  return (
    <MapProvider booking={props.route.params.data}>
      <Map {...props} />
    </MapProvider>
  );
}

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
