import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import lang from "../../assets/language.png";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = ({ title }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = async () => {
    await i18n.changeLanguage(i18n.language === "en" ? "ua" : "en");
    await AsyncStorage.setItem("lang", i18n.language);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <Text style={{ fontWeight: "900", fontSize: 16 }}>
        {t("tabbar." + title.toLowerCase())}
      </Text>
      <TouchableOpacity
        onPress={changeLanguage}
        style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
      >
        <Image source={lang} style={{ width: 30, height: 30 }} />
        <Text style={{}}>{t("header.language")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
