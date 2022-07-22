import React, { FC } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export const HomePageScreen: FC<{}> = () => {
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text>Welcome, Lets see all the posts!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 25,
  },
});
