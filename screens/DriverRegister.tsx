import { Button } from "@rneui/themed";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import Card from "../components/Card";
import Header from "../components/common/Header";
import CccdTab from "../components/driverRegister/CccdTab";
import LicenseTab from "../components/driverRegister/LicenseTab";
import { useAppDispatch, useAppSelector } from "../states";
import {
  clearRegisterDriver,
  patchRegisterDriver,
  selectRegisterTab,
} from "../states/slice/driverRegister";
import { RootNavigationProp } from "../types/navigation";

interface DriverRegisterProps {
  navigation: RootNavigationProp;
}
const renderScene = SceneMap({
  cccd: CccdTab,
  license: LicenseTab,
});
const DriverRegister = (props: DriverRegisterProps) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const tab = useAppSelector(selectRegisterTab);
  const handleChangeTab = (index: number) => {
    dispatch(patchRegisterDriver({ tab: index }));
  };
  useEffect(() => {
    const cb = () => {
      dispatch(clearRegisterDriver());
    };
    navigation.addListener("focus", cb);
    return () => {
      navigation.removeListener("focus", cb);
    };
  }, [dispatch, navigation]);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Đăng ký làm tài xế"
      />
      <Card
        style={{
          flexDirection: "row",
          gap: 10,
          marginVertical: 10,
          width: "90%",
        }}
      >
        <Button
          type={tab === 0 ? "solid" : "outline"}
          containerStyle={{ flex: 1 }}
          onPress={() => handleChangeTab(0)}
        >
          CCCD/CMND
        </Button>
        <Button
          type={tab === 1 ? "solid" : "outline"}
          containerStyle={{ flex: 1 }}
          onPress={() => handleChangeTab(1)}
        >
          Bằng lái xe
        </Button>
      </Card>
      <ScrollView style={{}}>
        <View style={{ height: 600 }}>
          <TabView
            navigationState={{
              index: tab,
              routes: [
                { key: "cccd", title: "cccd" },
                {
                  key: "license",
                  title: "license",
                },
              ],
            }}
            renderScene={renderScene}
            onIndexChange={handleChangeTab}
            renderTabBar={() => null}
            style={{
              overflow: "scroll",
            }}
          />
        </View>
      </ScrollView>
      <View style={{ height: 70, alignItems: "center" }}>
        <Button
          size="lg"
          raised
          buttonStyle={{ paddingHorizontal: 25 }}
          onPress={() => {
            if (tab === 1) {
              return;
            }
            dispatch(patchRegisterDriver({ tab: tab + 1 }));
          }}
        >
          {tab === 0 ? "Tiếp tục" : "Xác nhận"}
        </Button>
      </View>
    </View>
  );
};

export default DriverRegister;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});
