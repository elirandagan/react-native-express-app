import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

export const HeadLineComponent: FC<{
  value: string;
}> = ({ value }) => {
  return (
    <View>
      <Text style={styles.headline}> {value} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headline: {
    fontSize: 20,
    fontWeight: "500",
  },
});
