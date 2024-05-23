import { Icon, IconProps } from "@rneui/base";
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import { AppNavigationProp } from "../../types/navigation";

interface SettingProps {
  navigation: AppNavigationProp;
}

interface SettingItem {
  icon: IconProps;
  title: string;
}

const Setting = ({}: SettingProps) => {
  const items: SettingItem[] = [
    {
      title: "Đăng ký làm tài xế",
      icon: { name: "user-plus", type: "feather" },
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
