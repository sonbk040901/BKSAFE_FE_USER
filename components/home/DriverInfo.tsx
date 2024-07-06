import { Avatar, Icon, Skeleton } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLOR } from "../../constants/color";
import { IMAGE } from "../../constants/image";
import { useAppDispatch } from "../../states";
import { patchDriverInfo } from "../../states/slice/driver";
import { Driver } from "../../api";

type DriverProps = Driver;
const DriverInfo = ({ driverProps }: { driverProps?: DriverProps }) => {
  const dispatch = useAppDispatch();
  const { gender } = driverProps || {};
  const isSkeleton = !driverProps;
  const handleSelectDriver = () => {
    dispatch(patchDriverInfo(driverProps));
  };
  return (
    <View>
      {isSkeleton ? (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Skeleton
            circle
            width={50}
            height={50}
            style={{ opacity: 0.3 }}
          />
          <Skeleton
            height={50}
            style={{ borderRadius: 7, opacity: 0.3, flex: 1 }}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
          onPress={handleSelectDriver}
        >
          <Avatar
            size={50}
            rounded
            source={
              driverProps.avatar ? { uri: driverProps.avatar } : IMAGE.avatar
            }
          />
          <View style={{ justifyContent: "center", flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {driverProps.fullName}
              </Text>
              {gender === "MALE" ? (
                <Icon
                  name="male"
                  size={19}
                  color={COLOR.primary}
                />
              ) : gender === "FEMALE" ? (
                <Icon
                  name="female"
                  size={19}
                  color="hotpink"
                />
              ) : null}
            </View>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "baseline" }}
            >
              <Icon
                name="star"
                type="feather"
                size={16}
                color={COLOR.warning}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: COLOR.warning,
                }}
              >
                {+driverProps.rating.toFixed(2)}
              </Text>
            </View>
          </View>
          <Icon
            name="more-vertical"
            type="feather"
            size={20}
            color={COLOR.secondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DriverInfo;
