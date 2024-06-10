import React from "react";
import { View, Text, Image } from "react-native";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text>{t("about.1")}</Text>
      <Text style={{ marginTop: 10 }}>{t("about.2")}</Text>
      <Text style={{ marginTop: 10 }}>{t("about.3")}</Text>
      <Text style={{ marginTop: 10 }}>{t("about.4")}</Text>
    </View>
  );
};

export default About;
