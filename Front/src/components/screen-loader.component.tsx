import React, { FC } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export const ScreenLoaderComponent: FC<{}> = () => {
  const actSize = 80;
  return (
    <View style={[styles.horizontal, styles.container]}>
      <ActivityIndicator size={actSize} color="#3B71F3" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 180
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

