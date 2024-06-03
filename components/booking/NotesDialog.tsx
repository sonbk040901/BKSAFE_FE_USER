import { Button, CheckBox, Dialog } from "@rneui/themed";
import React, { useEffect, useRef, type FC } from "react";
import { TextInput, View } from "react-native";
import { COLOR } from "../../constants/color";

interface NotesDialogProps {
  text?: string;
  isVisible?: boolean;
  onRequestClose?: () => void;
  onChangeText?: (text: string) => void;
}

const NotesDialog: FC<NotesDialogProps> = ({
  text,
  isVisible = false,
  onRequestClose,
  onChangeText,
}) => {
  const ip = useRef<TextInput>(null);
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        ip.current?.focus();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);
  return (
    <Dialog
      statusBarTranslucent
      transparent
      onRequestClose={onRequestClose}
      onBackdropPress={onRequestClose}
      isVisible={isVisible}
      animationType="fade"
    >
      <Dialog.Title
        titleStyle={{ textAlign: "center", fontSize: 20 }}
        title={"Thêm ghi chú cho tài xế"}
      />
      <View>
        <CheckBox
          checked
          title="Tài xế biết tiếng anh"
        />
        <CheckBox
          checked
          title="Tài xế là phụ nữ"
        />
      </View>
      <TextInput
        ref={ip}
        placeholder="Nhập ghi chú cho tài xế"
        style={{
          borderWidth: 0.5,
          borderColor: COLOR.secondary,
          borderRadius: 5,
          textAlignVertical: "top",
          padding: 6,
        }}
        selectionColor={COLOR.primaryBackground}
        numberOfLines={6}
        multiline
        value={text}
        onChangeText={onChangeText}
      ></TextInput>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <Button
          onPress={() => {
            onChangeText?.("");
          }}
          type="outline"
          buttonStyle={{ paddingHorizontal: 20 }}
        >
          Xóa
        </Button>
        <Button onPress={onRequestClose}>Xác nhận</Button>
      </View>
    </Dialog>
  );
};

export default NotesDialog;
