import React from "react";
import { StyleSheet, View } from "react-native";
import { ICON } from "../../constants/image";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  DriverRegisterState,
  patchRegisterCccd,
  selectRegisterCccd,
} from "../../states/slice/driverRegister";
import CustomInput from "../common/CustomInput";
import Icon from "../common/Icon";
import SelectImage from "../common/SelectImg";
import Title from "./Title";

const CccdTab = () => {
  const dispatch = useAppDispatch();
  const { backImageSource, frontImageSource } =
    useAppSelector(selectRegisterCccd);
  const handleChange =
    (key: keyof DriverRegisterState["cccd"]) => (value: string) => {
      dispatch(patchRegisterCccd({ [key]: value }));
    };
  return (
    <View style={styles.container}>
      <Title title="Thông tin CCCD/CMND" />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <SelectImage
          source={frontImageSource ?? undefined}
          label="Ảnh mặt trước"
          onChange={(img) => {
            dispatch(
              patchRegisterCccd({ frontImageSource: img, frontImage: img.uri }),
            );
          }}
        />
        <SelectImage
          source={backImageSource ?? undefined}
          label="Ảnh mặt sau"
          onChange={(img) => {
            dispatch(
              patchRegisterCccd({ backImageSource: img, backImage: img.uri }),
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
          leftIcon={<Icon source={ICON.idCard} />}
          placeholder="Số CCCD/CMND"
          onChangeText={handleChange("number")}
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

export default CccdTab;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
