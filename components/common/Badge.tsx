import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "../../constants/color";

interface BadgeProps {
  icon: React.ReactNode;
  type?: "success" | "warning" | "danger";
  value: string;
  fullFill?: boolean;
}

const Badge = (props: BadgeProps) => {
  const { type = "success", value, fullFill } = props;
  const style = badgeStyle[type][fullFill ? "fullFill" : "default"];
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: style.backgroundColor,
        },
      ]}
    >
      <Text
        style={{
          color: style.color,
          fontWeight: "500",
          paddingHorizontal: 5,
          paddingVertical: 2,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
    backgroundColor: COLOR.primaryBackground,
  },
});

const badgeStyle: Record<
  Required<BadgeProps>["type"],
  Record<"default" | "fullFill", { backgroundColor: string; color: string }>
> = {
  success: {
    default: {
      backgroundColor: COLOR.successBackground,
      color: COLOR.success,
    },
    fullFill: {
      backgroundColor: COLOR.success,
      color: COLOR.white,
    },
  },
  warning: {
    default: {
      backgroundColor: COLOR.warningBackground,
      color: COLOR.warning,
    },
    fullFill: {
      backgroundColor: COLOR.warning,
      color: COLOR.white,
    },
  },
  danger: {
    default: {
      backgroundColor: COLOR.errorBackground,
      color: COLOR.error,
    },
    fullFill: {
      backgroundColor: COLOR.error,
      color: COLOR.white,
    },
  },
};
