import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import DetailInfo from "../../components/profile/DetailInfo";
import type { AuthNavigationProp } from "../../types/navigation";
import { updateProfile } from "../../states/slice/profile";
import { useAppDispatch } from "../../states";

interface ProfileProps {
  navigation: AuthNavigationProp;
}
const Info = () => (
  <View>
    <Text>dsd</Text>
  </View>
);
const renderScene = SceneMap({
  info: DetailInfo,
  car: Info,
});
const Profile = ({}: ProfileProps) => {
  const [tab, setTab] = useState<number>(0);
  const dispatch = useAppDispatch();
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Card style={{ flexDirection: "row", gap: 10 }}>
          <Button
            type={tab === 0 ? "solid" : "outline"}
            containerStyle={{ flex: 1 }}
            onPress={() => setTab(0)}
          >
            Cá nhân
          </Button>
          <Button
            type={tab === 1 ? "solid" : "outline"}
            containerStyle={{ flex: 1 }}
            onPress={() => setTab(1)}
          >
            Xe
          </Button>
        </Card>
        <View style={{ height: 450, width: "100%" }}>
          <TabView
            navigationState={{
              index: tab,
              routes: [
                { key: "info", title: "info" },
                {
                  key: "car",
                  title: "car",
                },
              ],
            }}
            renderScene={renderScene}
            onIndexChange={setTab}
            renderTabBar={() => null}
          />
        </View>
        <Button
          raised
          onPress={() => dispatch(updateProfile())}
        >
          Cập nhật
        </Button>
      </View>
    </AppWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
  },
});
