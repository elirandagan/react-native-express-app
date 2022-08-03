import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { GetUserData, UpdateUserProfile } from "../../../services";
import AsyncStorage from "@react-native-community/async-storage";
import {
  InputComponent,
  ButtonComponent,
  HeadLineComponent,
  ScreenLoaderComponent,
} from "../../components";

export const UserProfileScreen: FC<{}> = () => {
  const [loader, activateLoader] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [reapetPassword, setReapetPassword] = useState("");
  const [screenMessage, setScreenMessage] = useState("");
  const [screenError, setScreenError] = useState("");

  const getMetaData = async () => {
    activateLoader(true);
    try {
      const userId = await AsyncStorage.getItem("_USER_ID");
      if (!!userId) {
        const response = await GetUserData(userId);
        if (response.ok) {
          setUserName(response?.data?.userName);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      activateLoader(false);
    }
  };

  const onUpdateProfile = async () => {
    activateLoader(true);
    try {
      const userId = await AsyncStorage.getItem("_USER_ID");
      console.log(userId);
      const response = await UpdateUserProfile(
        userName,
        password,
        userId as string
      );
      if (response?.data?.flag) {
        setScreenMessage("Great, your profile has been updated!");
      } else {
        setScreenError("Something went wrong updating your profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      activateLoader(false);
    }
  };

  useEffect(() => {
    getMetaData();
  }, []);

  return (
    <ScrollView>
      {loader ? (
        <ScreenLoaderComponent />
      ) : (
        <View style={styles.root}>
          <HeadLineComponent value="Welcome to User Profile Screen!" />

          <InputComponent
            placeholder="userName"
            value={userName}
            setValue={setUserName}
          />

          <InputComponent
            placeholder="New Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />

          <InputComponent
            placeholder="Repeat New Password"
            value={reapetPassword}
            setValue={setReapetPassword}
            secureTextEntry={true}
          />

          <ButtonComponent text="Update" onPress={onUpdateProfile} />

          <Text style={styles.successMessage}>{screenMessage}</Text>
          <Text style={styles.error}>{screenError}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 25,
  },

  successMessage: {
    color: "green",
    fontSize: 14,
    textAlign: "center",
  },

  error: {
    color: "tomato",
    fontSize: 14,
  },
});
