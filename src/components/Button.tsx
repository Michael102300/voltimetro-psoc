import React from "react";
import { StyleProp, DimensionValue } from "react-native";
import { Button as ButtonRNE } from "@rneui/themed";

interface IButton {
  title: string;
  backgroundColor: string;
  onClick: () => void;
  width: DimensionValue | undefined;
  disable?: boolean;
}

const Button = ({
  title,
  backgroundColor,
  onClick,
  width,
  disable,
}: IButton) => {
  return (
    <ButtonRNE
      title={title}
      buttonStyle={{
        backgroundColor: backgroundColor,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 30,
      }}
      containerStyle={{
        width: width,
      }}
      titleStyle={{ fontWeight: "bold" }}
      onPress={onClick}
      disabled={disable}
    />
  );
};

export default Button;
