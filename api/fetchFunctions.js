import api from "./api";

export async function PingDevice() {
  return (await api.get("/ping")).data;
}

export async function SyncDevice() {
  return (await api.get("/off")).data;
}

export async function OnDevice() {
  return (await api.get("/on")).data;
}

export async function OffDevice() {
  return (await api.get("/off")).data;
}

export async function ClearEventDevice() {
  return (await api.get("/clearevent")).data;
}

export async function CreateEventDevice(
  date,
  time,
  intervalDays,
  intervalHours,
  duration,
) {
  return (
    await api.get(
      `/schedule?date=${date}&time=${time}&intervalDays=${intervalDays}&intervalHours=${intervalHours}&duration=${duration}`,
    )
  ).data;
}
