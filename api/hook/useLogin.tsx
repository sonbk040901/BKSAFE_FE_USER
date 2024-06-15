import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LoginDTO, login } from "../auth";
import { showAlert, showNativeAlert } from "../../utils/alert";
import { ErrorResponse } from "../types";
import { AxiosError } from "axios";

function useLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, status, error } = useMutation<
    string,
    AxiosError<ErrorResponse>,
    LoginDTO
  >({
    mutationFn: login,
  });
  useEffect(() => {
    if (status === "success") {
      showNativeAlert("Đăng nhập thành công");
      return;
    }
    if (error) {
      const mess = error.response?.data.message;
      showAlert(
        "Đăng nhập thất bại",
        typeof mess === "string" ? mess : mess?.[0],
      );
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const submit = () => {
    mutate({ phone: phone, password });
  };
  return { setPhone, setPassword, submit, status };
}

export default useLogin;
