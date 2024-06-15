import { AppNavigationParamList } from "./navigation";
const routeName: Record<keyof AppNavigationParamList, string> = {
  Home: "BKSafe",
  Setting: "Cài đặt",
  History: "Lịch sử chuyến đi",
  Profile: "Thông tin cá nhân",
};

export const mappingRouteName = (name: keyof AppNavigationParamList) => {
  return routeName[name];
};
