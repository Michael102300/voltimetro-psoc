import React from "react";
import { Button as ButtonRNE } from "@rneui/themed";

interface IButton {
  title: string;
  backgroundColor: string;
  onClick: () => void;
}

const Button = ({ title, backgroundColor, onClick }: IButton) => {
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
        width: "30%",
      }}
      titleStyle={{ fontWeight: "bold" }}
      onPress={onClick}
    />
  );
};

export default Button;
