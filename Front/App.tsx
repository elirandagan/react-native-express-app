import React, { FC } from "react";
import { StyleSheet, SafeAreaView } from "react-native";


import { Navigation } from "./src/navigation";
const App: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#61dafb33",
  },
});

export default App;
