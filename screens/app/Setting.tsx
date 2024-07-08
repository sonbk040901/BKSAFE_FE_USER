import { Icon, IconProps } from "@rneui/base";
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import { AppNavigationProp } from "../../types/navigation";
import { authApi } from "../../api";
import { showNativeAlert } from "../../utils/alert";

interface SettingProps {
  navigation: AppNavigationProp;
}

interface SettingItem {
  icon: IconProps;
  title: string;
  onPress?: () => void;
}

const Setting = ({ navigation }: SettingProps) => {
  const items: SettingItem[] = [
    {
      title: "Đăng ký làm tài xế",
      icon: { name: "user-plus", type: "feather" },
      onPress: () => {
        authApi.checkRegisterDriver().then((status) => {
          if (!status || status === "REJECTED") {
            navigation.push("DriverRegister");
            return;
          }
          showNativeAlert(
            status === "ACCEPTED"
              ? "Bạn đã có tài khoản tài xế"
              : "Đơn đăng ký của bạn đang được xử lý",
          );
        });
      },
    },
  ];
  return (
    <AppWrapper>
      <Card>
        <FlatList
          data={items}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  padding: 10,
                  alignItems: "center",
                  gap: 10,
                }}
                onPress={item.onPress}
              >
                <Icon {...item.icon} />
                <Text style={{ fontWeight: "500", fontSize: 20, flex: 1 }}>
                  {item.title}
                </Text>
                <Icon
                  name="chevron-right"
                  type="feather"
                />
              </TouchableOpacity>
            );
          }}
        />
      </Card>
    </AppWrapper>
  );
};

export default Setting;
