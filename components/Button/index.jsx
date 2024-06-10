import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors } from "../../constants/colors";

const Button = ({
  text,
  onPress,
  backgroundColor = Colors.main,
  loader = false,
  style = {},
}) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }, style]}
    >
      {loader ? (
        <Text style={styles.buttonText}>{"..."}</Text>
      ) : (
        <Text style={styles.buttonText}>{t(text).toUpperCase()}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
