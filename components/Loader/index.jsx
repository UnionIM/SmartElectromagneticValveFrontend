import React from "react";
import { View, ActivityIndicator } from "react-native";

const getColor = (color) => {
  return color || "#5D5FEF";
};

const getSize = (size) => {
  switch (size) {
    case "xl":
      return "large";
    case "l":
      return "large";
    case "m":
      return "medium";
    case "s":
      return "small";
    case "xs":
      return "small";
    default:
      return "medium";
  }
};

const Loader = ({ color = "", size = "large", wrapper = true }) => {
  const loaderColor = getColor(color);
  const loaderSize = getSize(size);

  if (wrapper) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 90,
        }}
      >
        <ActivityIndicator size={loaderSize} color={loaderColor} />
      </View>
    );
  } else {
    return <ActivityIndicator size={loaderSize} color={loaderColor} />;
  }
};

export default Loader;
