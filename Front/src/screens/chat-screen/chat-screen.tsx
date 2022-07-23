import React, { FC } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { HeadLineComponent } from "../../components";

export const ChatScreen: FC<{}> = () => {
  return (
    <ScrollView>
      <View style={styles.root}>
        <HeadLineComponent value="Welcome to Chat Screen!" />
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
