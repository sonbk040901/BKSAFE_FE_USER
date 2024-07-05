import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Chat from "../screens/Chat";
import Map from "../screens/Map";
import Notification from "../screens/Notification";
import Splash from "../screens/Splash";
import { RootNavigationParamList } from "../types/navigation";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import DetailChat from "../screens/DetailChat";
import HistoryDetail from "../screens/HistoryDetail";

const Stack = createStackNavigator<RootNavigationParamList>();
const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

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
        options={{
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
        }}
      />
      <Screen
        name="DetailChat"
        component={DetailChat}
      />
      <Screen
        name="Notification"
        component={Notification}
        options={{
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
        }}
      />
      <Screen
        name="HistoryDetail"
        component={HistoryDetail}
        // options={{
        //   transitionSpec: {
        //     open: { animation: "timing", config: { duration: 300 } },
        //     close: {
        //       animation: "timing",
        //       config: { duration: 300 },
        //     },
        //   },
        //   cardStyleInterpolator: ({ current, layouts }) => {
        //     return {
        //       cardStyle: {
        //         transform: [
        //           {
        //             translateX: current.progress.interpolate({
        //               inputRange: [0, 1],
        //               outputRange: [layouts.screen.width, 0],
        //             }),
        //           },
        //         ],
        //         opacity: current.progress,
        //       },
        //     };
        //   },
        //   gestureEnabled: true,
        //   // headerShown: false,
        //   // cardStyle: { backgroundColor: "transparent" },
        // }}
      />
    </Navigator>
  );
}
