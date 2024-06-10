import React, { useContext } from "react";
import { Colors } from "../constants/colors";
import Operating from "../assets/build.png";
import MyEvent from "../assets/event_note.png";
import Info from "../assets/info.png";
import { Image, StyleSheet } from "react-native";
import Header from "../components/Header";
import OperatingScreen from "../screens/Operating";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { ConnectionContext } from "../context/ConnectionContext";
import ConnectionLost from "../components/ConnectionLost";
import Loader from "../components/Loader";
import Events from "../screens/Events";
import About from "../screens/About";

const Tab = createBottomTabNavigator();

export default function AppRouter() {
  const { t } = useTranslation();
  const [connection] = useContext(ConnectionContext);

  if (connection.isLoading) {
    return <Loader size={"large"} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: Colors.main,
            padding: 15,
          },
          tabBarLabelStyle: {
            color: "#fff",
            fontSize: 12,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconSource;

            if (route.name === "Operating") {
              iconSource = Operating;
            } else if (route.name === "Event") {
              iconSource = MyEvent;
            } else if (route.name === "About") {
              iconSource = Info;
            }

            return (
              <Image
                source={iconSource}
                style={{ width: size, height: size }}
              />
            );
          },
          header: () => <Header title={route.name} />,
        })}
      >
        {connection.connection ? (
          <>
            <Tab.Screen
              name="About"
              component={About}
              options={{ tabBarLabel: t("tabbar.about") }}
            />
            <Tab.Screen
              name="Operating"
              component={OperatingScreen}
              options={{ tabBarLabel: t("tabbar.operating") }}
            />
            <Tab.Screen
              name="Event"
              component={Events}
              options={{ tabBarLabel: t("tabbar.event") }}
            />
          </>
        ) : (
          <Tab.Screen
            name="ConnectionLost"
            component={ConnectionLost}
            options={{ tabBarLabel: t("") }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter",
  },
});
