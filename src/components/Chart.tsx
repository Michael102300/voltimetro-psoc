import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useMode } from "../providers/mode.provider";

const Chart = () => {
  const mode = useMode();

  const getMode = (): string => {
    switch (mode?.mode) {
      case 0:
        return "mV";
      default:
        return "v";
    }
  };
  return (
    <View style={{ position: "absolute", bottom: 0 }}>
      <LineChart
        data={{
          labels: ["1", "2", "3", "4", "5", "6"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * -100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={170}
        yAxisSuffix={getMode()}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#0693dd",
          backgroundGradientTo: "#00d4ff",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#0693dd",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 1,
        }}
      />
    </View>
  );
};

export default Chart;
