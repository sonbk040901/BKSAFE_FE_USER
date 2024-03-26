import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";

interface SearchModalProps {}

const SearchModal = (props: SearchModalProps) => {
  const [visible, setVisible] = useState(true);
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      collapsable
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.wrapper}
      >
        <Animated.View entering={SlideInDown} style={styles.container}>
          <TextInput placeholder="Tìm kiếm" />
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "rgba(138, 138, 138, 0.154)",
  },
  container: {
    height: 400,
    backgroundColor: "white",
  },
});
