import { useEffect, useState } from "react";
import { login } from "../api";
import { useMutation } from "@tanstack/react-query";
import { showAlert, showNativeAlert } from "../utils/alert";
import { storeData } from "../utils/storage";

export default (onLogin?: () => void, deps: unknown[] = []) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, status, data } = useMutation({
    mutationFn: () => login(email, password),
  });
  useEffect(() => {
    if (status === "success") {
      setEmail("");
      setPassword("");
      showNativeAlert("Đăng nhập thành công");
      storeData("token", data.token);
      storeData("user", data);
      onLogin?.();
      return;
    }
    if (status === "error") {
      showAlert("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, status, ...deps]);
  return { email, password, setEmail, setPassword, submit: mutate, status };
};
