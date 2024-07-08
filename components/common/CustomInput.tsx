import React, { ReactNode } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { COLOR } from "../../constants/color";

interface CustomInputProps extends TextInputProps {
  label?: string;
  errorText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  errorText,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon ? { paddingLeft: 35 } : null,
            rightIcon ? { paddingRight: 35 } : null,
          ]}
          {...rest}
        />
        {rightIcon && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: "#333",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  leftIconContainer: {
    position: "absolute",
    left: 10,
  },
  rightIconContainer: {
    position: "absolute",
    right: 10,
  },
  errorText: {
    color: COLOR.error,
    fontSize: 11,
    position: "absolute",
    bottom: -15,
  },
});

export default CustomInput;
