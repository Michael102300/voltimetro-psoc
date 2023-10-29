import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";

import IndicatorData from "../data/indicators-data.json";

interface IIndicators {
  mode: number;
}

const Indicators = ({ mode }: IIndicators) => {
  return (
    <>
      <View
        style={{
          position: "relative",
          top: -80,
          right: "14%",
        }}
      >
        <Text style={[styles.textVolts]}> -{IndicatorData[mode][1]}</Text>
      </View>
      <View
        style={{
          position: "relative",
          top: -73,
          right: "23%",
        }}
      >
        <Text style={[styles.textVolts]}> -{IndicatorData[mode][2]}</Text>
      </View>
      <View
        style={{
          position: "relative",
          top: -58,
          right: "30%",
        }}
      >
        <Text style={[styles.textVolts]}> -{IndicatorData[mode][3]}</Text>
      </View>
      <View
        style={{
          position: "relative",
          top: -32,
          right: "35%",
        }}
      >
        <Text style={[styles.textVolts]}> -{IndicatorData[mode][4]}</Text>
      </View>
      <View
        style={{
          position: "relative",
          top: -138,
          right: "-14%",
        }}
      >
        <Text style={[styles.textVolts]}>{IndicatorData[mode][1]}</Text>
      </View>
      <View
        style={{
          position: "relative",
          top: -131,
          right: "-23%",
        }}
      >
        <Text style={[styles.textVolts]}>{IndicatorData[mode][2]}</Text>
      </View>
      <View
        style={{
          position: "relative",
          top: -115,
          right: "-30%",
        }}
      >
        <Text style={[styles.textVolts]}>{IndicatorData[mode][3]}</Text>
      </View>
      <View
        style={{
          position: "relative",
          top: -89,
          right: "-35%",
        }}
      >
        <Text style={[styles.textVolts]}>{IndicatorData[mode][4]}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  textVolts: {
    fontWeight: "300",
    fontSize: 12,
  },
});

export default Indicators;
