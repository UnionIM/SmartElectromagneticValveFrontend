import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MyAlertProvider } from "./context/AlertContext";
import Alert from "./components/Alert";
import { MyConnectionProvider } from "./context/ConnectionContext";
import AppRouter from "./router/AppRouter";
import "./i18n";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

const setLanguage = async (i18n) => {
  const lang = await AsyncStorage.getItem("lang");
  if (lang) {
    i18n.changeLanguage(lang);
  }
};

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    setLanguage(i18n);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MyAlertProvider>
        <MyConnectionProvider>
          <AppRouter />
          <Alert />
        </MyConnectionProvider>
      </MyAlertProvider>
    </QueryClientProvider>
  );
}
