import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "@rneui/themed";
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
        <Input
          ref={phoneRef}
          onChangeText={(v) => {
            clearError();
            dispatch({ type: "phone", payload: v });
          }}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          leftIcon={{
            name: "phone",
            type: "font-awesome",
            // color: COLOR.primary,
          }}
          errorMessage={getError("phone")}
          leftIconContainerStyle={{
            marginRight: 10,
          }}
          inputContainerStyle={{
            borderRadius: 10,
            backgroundColor: "white",
            borderWidth: 0.5,
            paddingHorizontal: 10,
            borderColor: COLOR.secondaryBackground,
          }}
        />
        <Input
          onChangeText={(v) => {
            clearError();
            dispatch({ type: "email", payload: v });
          }}
          placeholder="Email"
          keyboardType="email-address"
          leftIcon={{
            name: "mail",
            type: "entypo",
            // color: COLOR.primary,
          }}
          errorMessage={getError("email")}
          leftIconContainerStyle={{
            marginRight: 10,
          }}
          inputContainerStyle={{
            borderRadius: 10,
            backgroundColor: "white",
            borderWidth: 0.5,
            paddingHorizontal: 10,
            borderColor: COLOR.secondaryBackground,
          }}
        />

        <Input
          onChangeText={(v) => {
            clearError();
            dispatch({ type: "name", payload: v });
          }}
          placeholder="Họ và tên"
          leftIcon={{
            name: "user",
            type: "ant-design",
            // color: COLOR.primary,
          }}
          errorMessage={getError("name")}
          leftIconContainerStyle={{
            marginRight: 10,
          }}
          inputContainerStyle={{
            borderRadius: 10,
            backgroundColor: "white",
            borderWidth: 0.5,
            paddingHorizontal: 10,
            borderColor: COLOR.secondaryBackground,
          }}
        />
        <Input
          inputContainerStyle={{
            borderRadius: 10,
            backgroundColor: "white",
            borderWidth: 0.5,
            paddingHorizontal: 10,
            borderColor: COLOR.secondaryBackground,
          }}
          placeholder="Mật khẩu"
          errorMessage={getError("password")}
          onChangeText={(v) => {
            clearError();
            dispatch({ type: "pass", payload: v });
          }}
          secureTextEntry={!showPass}
          leftIcon={{
            name: "lock",
            type: "font-awesome",
            // color: COLOR.primary,
          }}
          leftIconContainerStyle={{
            marginRight: 10,
          }}
          rightIcon={{
            name: showPass ? "eye" : "eye-slash",
            type: "font-awesome",
            // color: COLOR.primary,
            onPress: () => setShowPass(!showPass),
          }}
        />
        <Input
          inputContainerStyle={{
            borderRadius: 10,
            backgroundColor: "white",
            borderWidth: 0.5,
            paddingHorizontal: 10,
            borderColor: COLOR.secondaryBackground,
          }}
          placeholder="Mật khẩu xác nhận"
          errorMessage={getError("confirm")}
          onChangeText={(v) => {
            clearError();
            dispatch({ type: "confirm", payload: v });
          }}
          secureTextEntry={!showPass}
          leftIcon={{
            name: "lock",
            type: "font-awesome",
            // color: COLOR.primary,
          }}
          leftIconContainerStyle={{
            marginRight: 10,
          }}
          rightIcon={{
            name: showPass ? "eye" : "eye-slash",
            type: "font-awesome",
            // color: COLOR.primary,
            onPress: () => setShowPass(!showPass),
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
