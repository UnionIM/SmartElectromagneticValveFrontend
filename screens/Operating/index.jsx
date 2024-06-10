import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Button from "../../components/Button";
import {
  OffDevice,
  OnDevice,
  SyncDevice,
  ClearEventDevice,
} from "../../api/fetchFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../constants/colors";
import { useMutation } from "react-query";
import { AlertContext } from "../../context/AlertContext";
import { ConnectionContext } from "../../context/ConnectionContext";
import NewEvent from "../../components/NewEvent";
import { useTranslation } from "react-i18next";
import closed from "../../assets/closed.png";
import open from "../../assets/open.png";

const getAsyncStorage = async (setIsOpen) => {
  const valveState = await AsyncStorage.getItem("valveState");
  if (valveState) {
    setIsOpen(JSON.parse(valveState).isOpenNow);
  }
};

function OperatingScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { t } = useTranslation();

  const [_, setAlert] = useContext(AlertContext);
  const [connection, setConnection] = useContext(ConnectionContext);

  const {
    mutate: mutateSyncDevice,
    isLoading: isSyncLoading,
    isError: isSyncError,
  } = useMutation(SyncDevice, {
    onError: (e) => {
      setAlert({ type: "error", message: "error" });
      setConnection({ connection: false, isLoading: false });
    },
  });
  const {
    mutate: mutateOnDevice,
    isLoading: isOnLoading,
    isError: isOnError,
  } = useMutation(OnDevice, {
    onError: (e) => {
      setAlert({ type: "error", message: "error" });
      setConnection({ connection: false, isLoading: false });
    },
  });
  const {
    mutate: mutateOffDevice,
    isLoading: isOffLoading,
    isError: isOffError,
  } = useMutation(OffDevice, {
    onError: (e) => {
      setAlert({ type: "error", message: "error" });
      setConnection({ connection: false, isLoading: false });
    },
  });

  const {
    mutate: mutateClearEventDevice,
    isLoading: isClearEventLoading,
    isError: isClearEventError,
  } = useMutation(ClearEventDevice, {
    onError: (e) => {
      setAlert({ type: "error", message: "error" });
      setConnection({ connection: false, isLoading: false });
    },
  });

  useEffect(() => {
    getAsyncStorage(setIsOpen);
  }, []);

  const handleSync = async () => {
    mutateSyncDevice();
    try {
      await AsyncStorage.setItem("isOpenNow", "0");
    } catch (e) {
      console.error(e, "Sync error");
    }
    setIsOpen(false);
  };

  const handleOn = async () => {
    mutateOnDevice();
    try {
      await AsyncStorage.setItem("isOpenNow", "1");
    } catch (e) {
      console.error(e, "On error");
    }
    setIsOpen(true);
  };

  const handleOff = async () => {
    mutateOffDevice();
    try {
      await AsyncStorage.setItem("isOpenNow", "0");
    } catch (e) {
      console.error(e, "Off error");
    }
    setIsOpen(false);
  };

  const handleCreate = () => {
    setCreateModalOpen(true);
  };

  const handleClear = async () => {
    mutateClearEventDevice();
    try {
      const valveState = await AsyncStorage.getItem("valveState");
      await AsyncStorage.setItem("valveState", {
        isOpenNow: valveState.isOpenNow,
      });
    } catch (e) {
      console.error(e, "Clear error");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        text="operating.sync"
        onPress={handleSync}
        backgroundColor={Colors.main}
        loader={isSyncLoading}
        style={{ width: 200 }}
      />
      <View style={styles.row}>
        <Button
          text="operating.on"
          onPress={handleOn}
          backgroundColor={Colors.green}
          loader={isOnLoading}
          style={{ width: 87 }}
        />
        <View style={{ width: 25 }} />
        <Button
          text="operating.off"
          onPress={handleOff}
          backgroundColor={Colors.red}
          loader={isOffLoading}
          style={{ width: 87 }}
        />
      </View>

      <View style={{ marginBottom: 25 }}>
        <Image source={isOpen ? open : closed}></Image>
        <Text style={{ fontWeight: 900, fontSize: 18, textAlign: "center" }}>
          {t(isOpen ? "valve.opened" : "valve.closed")}
        </Text>
      </View>

      <Button
        text="operating.event.create"
        onPress={handleCreate}
        backgroundColor={Colors.main}
        loader={isSyncLoading}
        style={{ width: 200 }}
      />
      <Button
        text="operating.event.clear"
        onPress={handleClear}
        backgroundColor={Colors.main}
        loader={isClearEventLoading}
        style={{ width: 200 }}
      />
      {createModalOpen && (
        <NewEvent onClose={() => setCreateModalOpen(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 25,
  },
});

export default OperatingScreen;
