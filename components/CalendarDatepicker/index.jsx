import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView, Text } from "react-native";
import Button from "../Button";
import { TransformDateAndTime } from "../../utils/date";

const CalendarDatepicker = ({ date, setDate }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const { date: selectedDate, time: selectedTime } = TransformDateAndTime(date);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView style={{ marginBottom: 20 }}>
      <Button onPress={showDatepicker} text="select.date" />
      <Button onPress={showTimepicker} text="select.time" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Text>
        {t("select.dateNTime")} {selectedDate}, {selectedTime}
      </Text>
    </SafeAreaView>
  );
};

export default CalendarDatepicker;
