import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { theme } from "./constants/theme";
import { InitAppProvider } from "./hook/useInitApp";
import GeneralNavigator from "./navigators/GeneralNavigator";
import { store } from "./states";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <InitAppProvider>
            <Provider store={store}>
              <StatusBar style="light" />
              <GeneralNavigator />
            </Provider>
          </InitAppProvider>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
