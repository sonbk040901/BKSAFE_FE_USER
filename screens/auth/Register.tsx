import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useRegister from "../../api/hook/useRegister";
import AuthWrapper from "../../components/AuthWrapper";
import CustomInput from "../../components/common/CustomInput";
import Icon from "../../components/common/Icon";
import { COLOR } from "../../constants/color";
import type { AuthNavigationProp } from "../../types/navigation";

const Register = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const phoneRef = useRef<PropsWithChildren<TextInput>>(null);
  const { submit, status, getError, clearError, dispatch, phone } =
    useRegister();
  const [showPass, setShowPass] = useState(false);
  useEffect(() => {
    if (status === "success") return navigation.navigate("Active", { phone });
  }, [navigation, phone, status]);
  useEffect(() => {
    const sto = setTimeout(() => {
      phoneRef.current?.focus();
    }, 500);
    return () => {
      clearTimeout(sto);
    };
  }, []);
  return (
    <AuthWrapper>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            textAlign: "center",
            paddingVertical: 20,
          }}
        >
          Đăng ký tài khoản
        </Text>
        <CustomInput
          ref={phoneRef}
          leftIcon={
            <Icon
              size={28}
              name="userPhone"
            />
          }
          width="95%"
          keyboardType="phone-pad"
          placeholder="Số điện thoại"
          errorText={getError("phone")}
          onChangeText={(v) => {
            clearError();
            dispatch({ type: "phone", payload: v });
          }}
        />
        <CustomInput
          leftIcon={
            <Icon
              size={28}
              name="email"
            />
          }
          keyboardType="email-address"
          width="95%"
          placeholder="Email"
          errorText={getError("email")}
          onChangeText={(v) => {
            clearError();
            dispatch({ type: "email", payload: v });
          }}
        />
        <CustomInput
          leftIcon={
            <Icon
              size={28}
              name="user"
            />
          }
          width="95%"
          placeholder="Họ và tên"
          errorText={getError("name")}
          onChangeText={(v) => {
            clearError();
            dispatch({ type: "name", payload: v });
          }}
        />
        <CustomInput
          leftIcon={
            <Icon
              size={28}
              name="lock"
            />
          }
          rightIcon={
            <TouchableOpacity onPress={() => setShowPass((v) => !v)}>
              <Icon
                size={28}
                name={showPass ? "hidden" : "view"}
              />
            </TouchableOpacity>
          }
          width="95%"
          placeholder="Mật khẩu"
          secureTextEntry={!showPass}
          errorText={getError("password")}
          onChangeText={(v) => {
            clearError();
            dispatch({ type: "pass", payload: v });
          }}
        />
        <CustomInput
          leftIcon={
            <Icon
              size={28}
              name="lock"
            />
          }
          rightIcon={
            <TouchableOpacity onPress={() => setShowPass((v) => !v)}>
              <Icon
                size={28}
                name={showPass ? "hidden" : "view"}
              />
            </TouchableOpacity>
          }
          width="95%"
          placeholder="Mật khẩu xác nhận"
          secureTextEntry={!showPass}
          errorText={getError("confirm")}
          onChangeText={(v) => {
            clearError();
            dispatch({ type: "confirm", payload: v });
          }}
        />

        <Button
          titleStyle={{
            fontWeight: "bold",
            fontSize: 20,
            paddingHorizontal: 30,
          }}
          size="lg"
          disabled={status === "pending"}
          onPress={() => submit()}
        >
          Đăng ký
        </Button>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text
            style={{
              textAlign: "center",
              paddingVertical: 20,
            }}
          >
            Bạn đã có tài khoản?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                textAlign: "center",
                paddingVertical: 20,
                color: COLOR.primary,
              }}
            >
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
