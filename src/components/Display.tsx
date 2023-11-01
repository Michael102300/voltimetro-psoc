import React from "react";
import { View } from "react-native";
import { Text } from "@rneui/themed";
import useValueVolts from "../hooks/useValueVolts";

const Display = () => {
  const { voltsDisplay } = useValueVolts();
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        backgroundColor: "black",
        height: "20%",
        position: "absolute",
        bottom: "28%",
      }}
    >
      <View
        style={{
          width: "95%",
          justifyContent: "center",
          backgroundColor: "#3A3A3A",
          height: "100%",
          borderRadius: 10,
          marginHorizontal: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 70,
          }}
        >
          {voltsDisplay()}
        </Text>
      </View>
    </View>
  );
};

export default Display;
