import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "@rneui/themed";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AuthWrapper from "../../components/AuthWrapper";
import { COLOR } from "../../constants/color";
import useLogin from "../../hook/useLogin";
import type { AuthNavigationProp } from "../../types/navigation";

const Login = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const emailRef = useRef<PropsWithChildren<TextInput>>(null);
  const { setEmail, setPassword, submit, status } = useLogin(() =>
    navigation.replace("App"),
  );
  useEffect(() => {
    const sto = setTimeout(() => {
      emailRef.current?.focus();
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
            fontSize: 25,
            textAlign: "center",
            paddingVertical: 20,
          }}
        >
          Đăng nhập vào ứng dụng
        </Text>
        <Input
          ref={emailRef}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <Input
          placeholder="Mật khẩu"
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          titleStyle={{
            fontWeight: "bold",
            fontSize: 15,
            paddingHorizontal: 30,
          }}
          size="lg"
          disabled={status === "pending"}
          onPress={() => submit()}
        >
          Đăng nhập
        </Button>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text
            style={{
              textAlign: "center",
              paddingVertical: 20,
            }}
          >
            Bạn chưa có tài khoản?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                textAlign: "center",
                paddingVertical: 20,
                color: COLOR.primary,
              }}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
