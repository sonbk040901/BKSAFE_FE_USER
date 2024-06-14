import { Button } from "@rneui/themed";
import React, { useState, type FC } from "react";
import { Text, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { COLOR } from "../constants/color";
import { RootNavigationProp } from "../types/navigation";
import PersonalNotis from "../components/notification/PersonalNotis";
import SystemNotis from "../components/notification/SystemNotis";
const renderScene = SceneMap({
  first: PersonalNotis,
  second: SystemNotis,
});
interface NotificationProps {
  navigation: RootNavigationProp;
}

const Notification: FC<NotificationProps> = ({ navigation }) => {
  const [tab, setTab] = useState<number>(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          height: 70,
          backgroundColor: COLOR.primaryBackground,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <View
          style={{
            position: "absolute",
            left: 7,
            top: 20,
            height: "100%",
          }}
        >
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
        <Text
          style={{
            fontWeight: "600",
            fontSize: 22,
            color: COLOR.primary,
            textTransform: "uppercase",
          }}
        >
          Thông báo
        </Text>
      </View>
      <View
        style={{
          // height: 50,
          // backgroundColor: COLOR.primaryBackground,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
          gap: 10,
          flexDirection: "row",
        }}
      >
        <Button
          size="sm"
          buttonStyle={{ width: 120 }}
          type={tab ? "outline" : "solid"}
          onPress={() => setTab(0)}
        >
          Cá nhân
        </Button>
        <Button
          size="sm"
          buttonStyle={{ width: 120 }}
          type={tab ? "solid" : "outline"}
          onPress={() => setTab(1)}
        >
          Hệ thống
        </Button>
      </View>
      <TabView
        navigationState={{ index: tab, routes }}
        onIndexChange={setTab}
        renderScene={renderScene}
        renderTabBar={() => null}
      />
    </View>
  );
};

export default Notification;
