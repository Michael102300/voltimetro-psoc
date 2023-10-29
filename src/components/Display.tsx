import React from "react";
import { View } from "react-native";
import { Text } from "@rneui/themed";

const Display = () => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        backgroundColor: "black",
        height: "20%",
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
          Out Range
        </Text>
      </View>
    </View>
  );
};

export default Display;
