import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "@rneui/themed";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { theme } from "./constants/theme";
import AppNavigator from "./navigators/AppNavigator";
import AuthNavigator from "./navigators/AuthNavigator";
import Map from "./screens/Map";
import Splash from "./screens/Splash";
import { RootNavigationParamList } from "./types/navigation";
import { InitAppProvider } from "./hook/useInitApp";
import { Provider } from "react-redux";
import { store } from "./states";

const Stack = createStackNavigator<RootNavigationParamList>();
const queryClient = new QueryClient();

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});
export default function Root() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
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
    </PersistQueryClientProvider>
  );
}
