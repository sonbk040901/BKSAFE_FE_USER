import {
  PermissionStatus,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import useProfile from "../api/hook/useProfile";
type AuthStatus = "undetermined" | "authenticated" | "unauthenticated";

export default () => {
  const { status } = useProfile();
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
  return [isLoading, isAuthenticated] as const;
};
