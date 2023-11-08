import React from "react";
import { StyleSheet, View } from "react-native";

import CircularIndicator from "../components/CircularIndicator";
import Button from "../components/Button";
import Display from "../components/Display";
import { useMode } from "../providers/mode.provider";
import useBLE from "../hooks/useBle";
import Chart from "../components/Chart";
import useValueVolts from "../hooks/useValueVolts";

const HomePage = () => {
  const mode = useMode();
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    sendData,
  } = useBLE();
  const { degress, voltsIndicator } = useValueVolts();
  const scanForDevice = async () => {
    const isPermissionEnabled = await requestPermissions();
    if (isPermissionEnabled) {
      scanForPeripherals();
    }
  };

  const changeMode = (modeSelect: number, sendMode: string) => {
    sendData(connectedDevice, `${sendMode}\r\n`);
  };
  return (
    <View style={styles.container}>
      <CircularIndicator
        mode={Number(mode?.mode)}
        degress={degress()}
        volts={voltsIndicator()}
      />
      <Display />
      <View
        style={{
          width: "100%",
          position: "absolute",
          top: "10%",
          height: "100%",
        }}
      >
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
            onClick={() => changeMode(0, "A")}
            width={"30%"}
          />
          <Button
            title="5V"
            backgroundColor={mode?.mode == 1 ? "green" : "#E0E0E0"}
            onClick={() => changeMode(1, "B")}
            width={"30%"}
          />
          <Button
            title="50V"
            backgroundColor={mode?.mode == 2 ? "green" : "#E0E0E0"}
            onClick={() => changeMode(2, "C")}
            width={"30%"}
          />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          top: "5%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Button
          title="SCAN"
          backgroundColor="blue"
          disable={Boolean(connectedDevice) || allDevices.length > 0}
          onClick={() => scanForDevice()}
          width={"30%"}
        />
        {allDevices.length > 0 && !connectedDevice && (
          <Button
            key={"scan_device"}
            title={"Connect " + String(allDevices[0]?.name)}
            backgroundColor="red"
            onClick={() => connectToDevice(allDevices[0])}
            width={"50%"}
          />
        )}
        {connectedDevice && (
          <Button
            key={"scan_device"}
            title={"Disconnect " + String(allDevices[0]?.name)}
            backgroundColor="red"
            onClick={() => disconnectFromDevice()}
            width={"50%"}
          />
        )}
      </View>
      <Chart />
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
