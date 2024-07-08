import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import Chat from "../screens/Chat";
import DetailChat from "../screens/DetailChat";
import DriverRegister from "../screens/DriverRegister";
import HistoryDetail from "../screens/HistoryDetail";
import Map from "../screens/Map";
import Notification from "../screens/Notification";
import Splash from "../screens/Splash";
import { RootNavigationParamList } from "../types/navigation";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator<RootNavigationParamList>();
const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const screenOpts: StackNavigationOptions = {
  transitionSpec: {
    open: { animation: "timing", config: { duration: 300 } },
    close: {
      animation: "timing",
      config: { duration: 300 },
    },
  },
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
        opacity: current.progress,
      },
    };
  },
  gestureEnabled: true,
  // headerShown: false,
  // cardStyle: { backgroundColor: "transparent" },
};

export default function GeneralNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false, animationEnabled: true }}>
      <Screen
        name="Splash"
        component={Splash}
      />
      <Screen
        name="App"
        component={AppNavigator}
      />
      <Screen
        name="Auth"
        component={AuthNavigator}
      />
      <Screen
        name="Map"
        component={Map}
        options={{}}
      />
      <Screen
        name="Chat"
        component={Chat}
        options={screenOpts}
      />
      <Screen
        name="DetailChat"
        component={DetailChat}
      />
      <Screen
        name="Notification"
        component={Notification}
        options={screenOpts}
      />
      <Screen
        name="HistoryDetail"
        component={HistoryDetail}
        options={screenOpts}
      />
      <Screen
        name="DriverRegister"
        component={DriverRegister}
        options={screenOpts}
      />
    </Navigator>
  );
}
