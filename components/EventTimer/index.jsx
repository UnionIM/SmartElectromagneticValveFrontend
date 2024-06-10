import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const getNextEvent = (
  initialDateStr,
  initialTimeStr,
  interval,
  intervalType,
) => {
  const now = new Date();
  let [year, month, day] = initialDateStr.split("-").map(Number);
  let [hour, minute] = initialTimeStr.split(":").map(Number);
  let eventDate = new Date(year, month - 1, day, hour, minute);

  if (eventDate < now) {
    if (intervalType === "days") {
      while (eventDate < now) {
        eventDate.setDate(eventDate.getDate() + interval);
      }
    } else if (intervalType === "hours") {
      while (eventDate < now) {
        eventDate.setHours(eventDate.getHours() + interval);
      }
    } else {
      throw new Error('Invalid interval type. Use "days" or "hours".');
    }
  }

  let nextEventDateStr = eventDate.toISOString().split("T")[0];
  let nextEventTimeStr = eventDate.toTimeString().split(" ")[0].substring(0, 5);

  return { nextEventDateStr, nextEventTimeStr, eventDate };
};

const EventTimer = ({
  initialDateStr,
  initialTimeStr,
  interval,
  intervalType,
}) => {
  const [nextEvent, setNextEvent] = useState(
    getNextEvent(initialDateStr, initialTimeStr, interval, intervalType),
  );
  const [timeLeft, setTimeLeft] = useState("");

  const calculateTimeLeft = () => {
    const now = new Date();
    const timeDifference = nextEvent.eventDate - now;

    if (timeDifference <= 0) {
      const updatedEvent = getNextEvent(
        initialDateStr,
        initialTimeStr,
        interval,
        intervalType,
      );
      setNextEvent(updatedEvent);
    } else {
      const hours = Math.floor(timeDifference / 1000 / 60 / 60);
      const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [nextEvent]);

  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 10 }}>
        {nextEvent.nextEventDateStr} {nextEvent.nextEventTimeStr}
      </Text>
    </View>
  );
};

export default EventTimer;
