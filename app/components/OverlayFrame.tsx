import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
  frameWidth: number;
  frameHeight: number;
  circleSize: number;
  frameY: number;
}

const OverlayFrame: React.FC<Props> = ({
  frameWidth,
  frameHeight,
  circleSize,
  frameY,
}) => {
  return (
    <View
      style={[
        styles.frame,
        {
          width: frameWidth,
          height: frameHeight,
          top: frameY,
          left: (frameWidth * 0.055),
        },
      ]}
    >
      <View style={styles.circleContainer}>
        <View style={[styles.circle, { width: circleSize, height: circleSize }]} />
        <View style={[styles.circle, { width: circleSize, height: circleSize }]} />
        <View style={[styles.circle, { width: circleSize, height: circleSize }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circle: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 100,
  },
});

export default OverlayFrame;
