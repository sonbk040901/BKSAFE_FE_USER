import React from "react";
import { StyleSheet, View } from "react-native";
import { ICON } from "../../constants/image";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  DriverRegisterState,
  patchRegisterLicense,
  selectRegisterLicense,
} from "../../states/slice/driverRegister";
import CustomInput from "../common/CustomInput";
import Icon from "../common/Icon";
import SelectImage from "../common/SelectImg";
import Title from "./Title";

const LicenseTab = () => {
  const dispatch = useAppDispatch();
  const { frontImageSource, backImageSource } = useAppSelector(
    selectRegisterLicense,
  );
  const handleChange =
    (key: keyof DriverRegisterState["license"]) => (value: string) => {
      dispatch(patchRegisterLicense({ [key]: value }));
    };
  return (
    <View style={styles.container}>
      <Title title="Thông tin bằng lái xe" />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <SelectImage
          source={frontImageSource ?? undefined}
          label="Ảnh mặt trước"
          onChange={(img) => {
            dispatch(
              patchRegisterLicense({
                frontImageSource: img,
                frontImage: img.uri,
              }),
            );
          }}
        />
        <SelectImage
          source={backImageSource ?? undefined}
          label="Ảnh mặt sau"
          onChange={(img) => {
            dispatch(
              patchRegisterLicense({
                backImageSource: img,
                backImage: img.uri,
              }),
            );
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <CustomInput
          leftIcon={<Icon source={ICON.user} />}
          placeholder="Họ và tên"
          onChangeText={handleChange("fullName")}
        />
        <CustomInput
          leftIcon={<Icon source={ICON.birthday} />}
          placeholder="Ngày sinh (Tháng/Ngày/Năm)"
          onChangeText={handleChange("birthday")}
        />
        <CustomInput
          leftIcon={<Icon source={ICON.driversLicense} />}
          placeholder="Số bằng lái xe"
          onChangeText={handleChange("number")}
        />
        <CustomInput
          leftIcon={<Icon source={ICON.truck} />}
          placeholder="Loại bằng lái xe (A1, A2, B1, B2, C, D, E)"
          onChangeText={handleChange("classType")}
        />
        <CustomInput
          leftIcon={<Icon source={ICON.location} />}
          placeholder="Nơi cấp"
          onChangeText={handleChange("address")}
        />
        <CustomInput
          leftIcon={<Icon source={ICON.calendar} />}
          placeholder="Ngày cấp (Tháng/Ngày/Năm)"
          onChangeText={handleChange("issueDate")}
        />
        <CustomInput
          leftIcon={<Icon source={ICON.expired} />}
          placeholder="Ngày hết hạn (Tháng/Ngày/Năm)"
          onChangeText={handleChange("expireDate")}
        />
      </View>
    </View>
  );
};

export default LicenseTab;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
