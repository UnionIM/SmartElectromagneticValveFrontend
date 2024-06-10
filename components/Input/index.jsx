import React from "react";
import { TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors } from "../../constants/colors";
const MyInput = ({
  keyboardType = "default",
  value,
  setValue,
  placeholder,
  width = "unset",
}) => {
  const { t } = useTranslation();

  const handleInput = (value) => {
    setValue(value);
  };

  return (
    <TextInput
      style={{
        borderStyle: "solid",
        borderColor: Colors.main,
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: width,
      }}
      keyboardType={keyboardType}
      value={value}
      onChangeText={handleInput}
      placeholder={t(placeholder)}
    />
  );
};

export default MyInput;
