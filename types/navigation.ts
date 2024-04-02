import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Account, Booking } from "../api";
export type RootNavigationParamList = {
  Splash: undefined;
  App: {
    userInfo: Account;
  };
  Map: {
    data: Nullable<Booking>;
  };
  Auth: undefined;
};
export type RootNavigationProp = StackNavigationProp<RootNavigationParamList>;
export type AppNavigationParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
};
export type AppNavigationProp = DrawerNavigationProp<AppNavigationParamList> &
  StackNavigationProp<RootNavigationParamList>;
export type AuthNavigationParamList = {
  GetStarted: undefined;
  Login: undefined;
  Register: undefined;
};
export type AuthNavigationProp = StackNavigationProp<AuthNavigationParamList> &
  StackNavigationProp<RootNavigationParamList>;
export type MapRouteProp = RouteProp<RootNavigationParamList, "Map">;
