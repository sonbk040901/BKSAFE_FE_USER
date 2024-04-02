import {
  PermissionStatus,
  requestForegroundPermissionsAsync,
} from "expo-location";
import React, { createContext, useEffect, useState } from "react";
import useProfile from "../api/hook/useProfile";
import { Account } from "../api";
type AuthStatus = "undetermined" | "authenticated" | "unauthenticated";

export default function useInitApp() {
  const { status, data, refetch } = useProfile();
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED,
  );
  const authStatus: AuthStatus =
    status === "loading"
      ? "undetermined"
      : status === "success"
      ? "authenticated"
      : "unauthenticated";
  // const [authStatus, setAuthStatus] = useState<AuthStatus>("undetermined");
  // TODO: Sửa lại ở đây nếu từ chối quyền truy cập thì sẽ chuyển sang cài đặt quyền truy cập
  const isLoading =
    permissionStatus === PermissionStatus.UNDETERMINED ||
    authStatus === "undetermined";
  const isAuthenticated = authStatus === "authenticated";
  useEffect(() => {
    const init = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      setPermissionStatus(status);
    };
    init();
  }, []);
  return { isLoading, isAuthenticated, data, refetch };
}

type InitAppStates = {
  isLoading: boolean;
  isAuthenticated: boolean;
  data: Account | null;
  refetch: () => void;
};
const InitAppContext = createContext<InitAppStates>({
  isLoading: true,
  isAuthenticated: false,
  data: null,
  refetch: () => {},
});
export const InitAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useInitApp();
  return (
    <InitAppContext.Provider value={value}>{children}</InitAppContext.Provider>
  );
};
export const useInitAppContext = () => React.useContext(InitAppContext);
