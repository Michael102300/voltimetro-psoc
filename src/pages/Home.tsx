import React from "react";
import { StyleSheet, Text, View } from "react-native";

import CircularIndicator from "../components/CircularIndicator";
import Button from "../components/Button";
import Display from "../components/Display";
import { useMode } from "../providers/mode.provider";

const HomePage = () => {
  const mode = useMode();
  return (
    <View style={styles.container}>
      <CircularIndicator mode={Number(mode?.mode)} />
      <View
        style={{
          width: "100%",
          position: "absolute",
          top: "53%",
          height: "100%",
        }}
      >
        <Display />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Button
            title="500mV"
            backgroundColor={mode?.mode == 0 ? "green" : "#E0E0E0"}
            onClick={() => mode?.setMode(0)}
          />
          <Button
            title="5V"
            backgroundColor={mode?.mode == 1 ? "green" : "#E0E0E0"}
            onClick={() => mode?.setMode(1)}
          />
          <Button
            title="50V"
            backgroundColor={mode?.mode == 2 ? "green" : "#E0E0E0"}
            onClick={() => mode?.setMode(2)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePage;
