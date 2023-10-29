import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "@rneui/themed";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";
import Indicators from "./Indicators";
import IndicatorsData from "../data/indicators-data.json";

const { width } = Dimensions.get("screen");
const SIZE = width * 0.9;

interface ICircularIndicator {
  mode: number;
  volts?: number;
}

const CircularIndicator = ({ mode }: ICircularIndicator) => {
  const rotateIndicator = "72deg";
  const transformRotate = {
    transform: [{ rotate: rotateIndicator }],
  };
  return (
    <View>
      <AnimatedCircularProgress
        size={SIZE}
        fill={50}
        arcSweepAngle={180}
        rotation={270}
        lineCap="round"
        width={10}
        duration={1000}
        tintColor="#E0E0E0"
        backgroundColor="#E0E0E0"
        backgroundWidth={10}
        padding={10}
        renderCap={({ center }) => (
          <Circle cx={center.x} cy={center.y} r="10" fill="blue" />
        )}
        children={() => {
          return (
            <>
              <Indicators mode={mode} />
              <View style={[styles.mover, transformRotate]}>
                <View style={[styles.indicator]} />
              </View>
              <View style={[styles.containerText]}>
                <Text style={[styles.textVolts2]}>
                  -{IndicatorsData[mode][5]}
                </Text>
                <Text style={[styles.textVolts2]}>
                  {IndicatorsData[mode][5]}
                </Text>
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mover: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  indicator: {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: "35%",
    marginTop: "15%",
    width: 2,
    borderRadius: 8,
  },
  containerText: {
    width: "92%",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
  },
  textVolts: {
    fontWeight: "300",
    fontSize: 12,
  },
  textVolts2: {
    fontWeight: "300",
  },
});

export default CircularIndicator;
