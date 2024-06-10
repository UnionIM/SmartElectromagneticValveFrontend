import React, { useContext, useState } from "react";
import Modal from "../Modal";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import CalendarDatepicker from "../CalendarDatepicker";
import Input from "../Input";
import FormError from "../FormError";
import Button from "../Button";
import { Colors } from "../../constants/colors";
import { useMutation } from "react-query";
import { CreateEventDevice } from "../../api/fetchFunctions";
import { AlertContext } from "../../context/AlertContext";
import { ConnectionContext } from "../../context/ConnectionContext";
import { TransformDateAndTime } from "../../utils/date";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewEvent = ({ onClose }) => {
  const { t } = useTranslation();
  const [_, setAlert] = useContext(AlertContext);
  const [__, setConnection] = useContext(ConnectionContext);

  const [daysInterval, setDaysInterval] = useState(0);
  const [hoursInterval, setHoursInterval] = useState(0);
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  const { date: selectedDate, time: selectedTime } = TransformDateAndTime(date);

  const { mutate, isLoading } = useMutation(
    () =>
      CreateEventDevice(
        selectedDate,
        selectedTime,
        daysInterval,
        hoursInterval,
        duration,
      ),
    {
      onSuccess: () => {
        setAlert({ type: "success", message: "success" });
      },
      onError: (e) => {
        console.log(e);
        setAlert({ type: "error", message: "error" });
        setConnection({ connection: true, isLoading: false });
      },
    },
  );

  const onSubmit = async () => {
    if (daysInterval > 0 && hoursInterval > 0) {
      return;
    }
    const isOpenNow = await AsyncStorage.getItem("isOpenNow");
    await AsyncStorage.setItem(
      "valveState",
      JSON.stringify({
        selectedDate,
        selectedTime,
        daysInterval,
        hoursInterval,
        duration,
        isOpenNow: isOpenNow !== "0",
      }),
      (err) => {
        if (err) {
          console.log("an error");
          throw err;
        }
        console.log("success");
      },
    ).catch((err) => {
      console.log("error is: " + err);
    });
    await mutate();
  };

  return (
    <Modal onClose={onClose}>
      <Text
        style={{
          fontWeight: "900",
          fontSize: 18,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        {t("event.new").toUpperCase()}
      </Text>
      <Text style={{ fontWeight: "900", marginBottom: 10 }}>
        {t("select.dateNTime.label")}
      </Text>
      <CalendarDatepicker date={date} setDate={setDate} />
      <Text style={{ fontWeight: "900" }}>{t("interval.title")}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <Input
          value={daysInterval}
          setValue={setDaysInterval}
          keyboardType={"numeric"}
          placeholder={"interval.day"}
          width={100}
        />
        <Input
          value={hoursInterval}
          setValue={setHoursInterval}
          keyboardType={"numeric"}
          placeholder={"interval.hours"}
          width={100}
        />
      </View>
      {daysInterval > 0 && hoursInterval > 0 && (
        <FormError message={"error.validation.interval"} />
      )}
      <Text style={{ fontWeight: "900" }}>{t("duration.title")}</Text>
      <Input
        value={duration}
        setValue={setDuration}
        keyboardType={"numeric"}
        placeholder={"duration.placeholder"}
      />
      <Button
        onPress={onSubmit}
        text={"event.create"}
        backgroundColor={Colors.main}
        loader={isLoading}
      />
    </Modal>
  );
};

export default NewEvent;
