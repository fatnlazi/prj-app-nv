import { StyleSheet } from "react-native";

export const em = 16; /* default: 1 em = 16 pixels */

export const FontSize = {
  h1: 36,
  h2: 30,
  h3: 24,
  xl: 20,
  lg: 16,
  md: 14,
  sm: 13,
};

export const CommonStyle = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  border: {
    borderWidth: 0.5,
  },
  round: {
    borderRadius: 4,
  },
});
