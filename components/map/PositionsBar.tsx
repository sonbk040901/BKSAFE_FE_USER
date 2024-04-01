import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLOR } from "../../constants/color";
import Card from "../Card";
import { Divider, Icon } from "@rneui/themed";
import FindAdress from "./FindModal";

interface PostionsBarProps {
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
  data?: string[];
  editable?: boolean;
  onChange?: (index: number, address: string) => void;
  onAdd?: (address: string) => void;
  onRemove?: (index: number) => void;
}

export default function PostionsBar({
  visible = true,
  style,
  data = [],
  editable = true,
  onChange,
  onAdd,
  onRemove,
}: PostionsBarProps) {
  const [modifyIndex, setModifyIndex] = useState<number | null>();
  const modalVisible = modifyIndex !== undefined;
  const modalValue =
    modifyIndex !== undefined && modifyIndex !== null
      ? data[modifyIndex]
      : undefined;

  const handleSelect = (_: unknown, v: number) => {
    if (!editable) return;
    setModifyIndex(v);
  };
  if (!visible) return null;
  return (
    <Card
      radius={10}
      shadow={false}
      style={[styles.container, style]}
    >
      <FindAdress
        key={modifyIndex}
        visible={modalVisible}
        value={modalValue}
        onChangeText={(v) => {
          if (modifyIndex === undefined) {
            return;
          }
          setModifyIndex(undefined);
          if (modifyIndex !== null) onChange?.(modifyIndex, v);
          else onAdd?.(v);
        }}
        onRequestClose={() => setModifyIndex(undefined)}
      />
      {Array(data.length * 2 - 1)
        .fill(0)
        .map((_, i) => {
          if (i === 0)
            return (
              <Position
                key={i}
                label={data[0]}
                value={0}
                icon={<Circle />}
                onSelect={handleSelect}
              />
            );
          if (i % 2 === 0)
            return (
              <Position
                key={i}
                label={data[i / 2]}
                value={i / 2}
                icon={<Triangle />}
                endIcon={
                  editable && (
                    <TouchableOpacity onPress={() => onRemove?.(i / 2)}>
                      <Icon
                        name="cancel"
                        size={20}
                        color="gray"
                      />
                    </TouchableOpacity>
                  )
                }
                onSelect={handleSelect}
              />
            );
          return <CustomDivider key={i} />;
        })}
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 5,
          bottom: -40,
          backgroundColor: "white",
          borderRadius: 999,
          padding: 1,
          display: editable ? "flex" : "none",
        }}
        onPress={() => setModifyIndex(null)}
      >
        <Icon
          name="add-circle"
          size={30}
          color="gray"
        />
      </TouchableOpacity>
    </Card>
  );
}
const Position = ({
  label,
  value,
  icon,
  endIcon,
  onSelect,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  endIcon?: React.ReactNode;
  onSelect?: (label: string, value: number) => void;
}) => {
  return (
    <View style={styles.item}>
      {icon}
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => onSelect?.(label, value)}
      >
        <Text
          numberOfLines={1}
          style={{ fontWeight: "500" }}
        >
          {label}
        </Text>
      </TouchableOpacity>
      {endIcon}
    </View>
  );
};
const CustomDivider = () => {
  return (
    <View style={styles.item}>
      <View style={{ width: 13, alignItems: "center" }}>
        <Line />
      </View>
      <View style={{ flex: 1 }}>
        <Divider />
      </View>
    </View>
  );
};
const Circle = () => {
  return (
    <View
      style={{
        width: 13,
        height: 13,
        borderRadius: 999,
        backgroundColor: COLOR.primary,
      }}
    ></View>
  );
};
const Line = () => {
  return (
    <View
      style={{
        height: 30,
        width: 1.5,
        borderRadius: 2,
        backgroundColor: COLOR.primary,
        flex: 1,
      }}
    />
  );
};
const Triangle = () => {
  return (
    <View
      style={{
        width: 13,
        height: 10,
        backgroundColor: COLOR.primary,
        borderTopWidth: 10,
        borderTopColor: COLOR.primary,
        borderRightColor: "white",
        borderRightWidth: 6.5,
        borderLeftWidth: 6.5,
        borderLeftColor: "white",
      }}
    ></View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
  },
  item: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
