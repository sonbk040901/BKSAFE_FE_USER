import {
  PermissionStatus,
  requestForegroundPermissionsAsync,
} from "expo-location";
import React, { createContext, useEffect, useState } from "react";
import useProfile from "../api/hook/useProfile";
import { Account, ErrorResponse } from "../api";
import { createConnect, disconnect } from "../socket";
type AuthStatus = "undetermined" | "authenticated" | "unauthenticated";

export default function useInitApp() {
  const { status, data, refetch, error } = useProfile();
  const [socketReady, setSocketReady] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED,
  );
  const authStatus: AuthStatus =
    status === "idle" || status === "loading" || socketReady === false
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
  useEffect(() => {
    if (status === "success") {
      createConnect().then(() => setSocketReady(true));
      return () => {
        disconnect();
        setSocketReady(false);
      };
    }
  }, [status]);
  return { isLoading, isAuthenticated, data, refetch, error };
}

type InitAppStates = {
  isLoading: boolean;
  isAuthenticated: boolean;
  data: Account | null;
  error: ErrorResponse | null;
  refetch: () => void;
};
const InitAppContext = createContext<InitAppStates>({
  isLoading: true,
  isAuthenticated: false,
  data: null,
  error: null,
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
