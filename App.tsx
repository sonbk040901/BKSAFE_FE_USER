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
              </Stack.Navigator>
            </Provider>
          </InitAppProvider>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
