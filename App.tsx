import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { theme } from "./constants/theme";
import { InitAppProvider } from "./hook/useInitApp";
import AppNavigator from "./navigators/AppNavigator";
import AuthNavigator from "./navigators/AuthNavigator";
import Map from "./screens/Map";
import Splash from "./screens/Splash";
import { store } from "./states";
import { RootNavigationParamList } from "./types/navigation";
import Chat from "./screens/Chat";
import Notification from "./screens/Notification";

const Stack = createStackNavigator<RootNavigationParamList>();
const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <InitAppProvider>
            <Provider store={store}>
              <StatusBar style="light" />
              <Stack.Navigator
                screenOptions={{ headerShown: false, animationEnabled: true }}
              >
                <Stack.Screen
                  name="Splash"
                  component={Splash}
                />
                <Stack.Screen
                  name="App"
                  component={AppNavigator}
                />
                <Stack.Screen
                  name="Auth"
                  component={AuthNavigator}
                />
                <Stack.Screen
                  name="Map"
                  component={Map}
                  options={{}}
                />
                <Stack.Screen
                  name="Chat"
                  component={Chat}
                />
                <Stack.Screen
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
              </Stack.Navigator>
            </Provider>
          </InitAppProvider>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
