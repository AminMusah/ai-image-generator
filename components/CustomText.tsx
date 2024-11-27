// components/CustomText.js
import React from "react";
import { Text as ReactNativeText, StyleSheet } from "react-native";

export default function Text(props: any) {
  return (
    <ReactNativeText style={[styles.text, props.style]}>
      {props.children}
    </ReactNativeText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Nunito", // Default font
  },
});
