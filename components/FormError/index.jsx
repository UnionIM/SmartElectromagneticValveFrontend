import React from "react";
import { Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors } from "../../constants/colors";
import error from "../../assets/error.png";

const FormError = ({ message }) => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Image source={error} alt="*" />
      <Text style={{ color: Colors.red }}>{t(message)}</Text>
    </View>
  );
};

export default FormError;
