import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { em } from "../../constants";

export type TextStyledSize =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | undefined;

export interface TextStyledProps extends TextProps {
  style?: TextStyle;
  size?: TextStyledSize;
}

export const TextStyled = (props: TextStyledProps) => {
  const fontSize = (size: TextStyledSize) => {
    switch (size) {
      case "h1":
        return 2 * em;
      case "h2":
        return 1.5 * em;
      case "h3":
        return 1.17 * em;
      case "h5":
        return 0.83 * em;
      case "h6":
        return 0.67 * em;
      case "h4":
      case "p":
      default:
        return 1 * em;
    }
  };

  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontSize: fontSize(props.size),
      }}
    />
  );
};
