/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import AppHeader from "../components/AppHeader";
import CustomDrawer from "../components/CustomDrawer";
import History from "../screens/app/History";
import Home from "../screens/app/Home";
import Profile from "../screens/app/Profile";
import Setting from "../screens/app/Setting";
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={{
        swipeEnabled: true,
        swipeEdgeWidth: 50,
        header: (props: any) => <AppHeader {...props} />,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
      />
      <Drawer.Screen
        name="History"
        component={History}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
