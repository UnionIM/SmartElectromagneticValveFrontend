import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlertContext } from "../../context/AlertContext";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";
import EventTimer from "../../components/EventTimer";

const getEvent = (setEventData, setAlert) => {
  AsyncStorage.getItem("valveState")
    .then((res) => {
      setEventData(JSON.parse(res));
    })
    .catch((e) => {
      setAlert({ type: "error", message: "error" });
      console.log(e, "ASYNC STORAGE ERROR", e);
    });
};

const Events = () => {
  const [eventData, setEventData] = useState();
  const [_, setAlert] = useContext(AlertContext);
  const { t } = useTranslation();

  useFocusEffect(() => {
    getEvent(setEventData, setAlert);
  });

  const interval =
    eventData?.daysInterval > 0
      ? eventData?.daysInterval
      : eventData?.hoursInterval;
  const intervalType = eventData?.daysInterval > 0 ? "days" : "hours";
  const intervalText =
    eventData?.daysInterval > 0 ? "event.daysInterval" : "event.hoursInterval";

  return (
    eventData?.selectedDate.length > 0 && (
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ ...styles.flex_container, marginBottom: 20 }}>
          <Icon name="calendar" size={30} color="#000" />
          <View style={styles.flex_container}>
            <Text style={styles.text_bold}>{t("event.date")}</Text>
            <Text>{eventData?.selectedDate}</Text>
          </View>
        </View>
        <View style={{ ...styles.flex_container, marginBottom: 20 }}>
          <Icon name="clock" size={30} color="#000" />
          <View style={styles.flex_container}>
            <Text style={styles.text_bold}>{t("event.time")}</Text>
            <Text>{eventData?.selectedTime}</Text>
          </View>
        </View>
        <View style={{ ...styles.flex_container, marginBottom: 20 }}>
          <Icon name="hourglass-half" size={30} color="#000" />
          <View style={styles.flex_container}>
            <Text style={styles.text_bold}>{t(intervalText)}</Text>
            <Text>{interval}</Text>
          </View>
        </View>
        {eventData?.duration > 0 && (
          <View style={{ ...styles.flex_container, marginBottom: 20 }}>
            <Icon name="lock-open" size={30} color="#000" />
            <View style={styles.flex_container}>
              <Text style={styles.text_bold}>{t("event.duration")}</Text>
              <Text>{eventData?.duration}</Text>
              <Text>{t("event.duration.seconds")}</Text>
            </View>
          </View>
        )}

        <Text
          style={{
            ...styles.text_bold,
            textAlign: "center",
            fontSize: 20,
            marginTop: 20,
          }}
        >
          {t("event.will.open")}
        </Text>
        {eventData?.selectedDate && eventData?.selectedTime ? (
          <EventTimer
            initialDateStr={eventData?.selectedDate}
            initialTimeStr={eventData?.selectedTime}
            interval={parseInt(interval)}
            intervalType={intervalType}
          />
        ) : (
          <Text>Loadin</Text>
        )}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  flex_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text_bold: {
    fontWeight: "bold",
  },
});

export default Events;
