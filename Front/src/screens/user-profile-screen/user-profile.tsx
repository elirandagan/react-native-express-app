import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
// import ApiService from "../../../services/api-service";
import { GetUserData, UpdateUserProfile } from "../../../services";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InputComponent, ButtonComponent, HeadLineComponent } from "../../components";

export const UserProfileScreen: FC<{}> = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [screenMessage, setScreenMessage] = useState("");
  const [screenError, setScreenError] = useState("");

  const getMetaData = async () => {
    const userId = await AsyncStorage.getItem("_USER_ID");
    if (!!userId) {
      const response = await GetUserData(userId);
      if (response.ok) {
        setUserName(response?.data?.userName);
      }
    }
  };

  const onUpdateProfile = async () => {
    //TODO: validation
    if (userName && password && password === passwordRepeat) {
      const userId = await AsyncStorage.getItem("_USER_ID");
      console.log(userId);

      const response = await UpdateUserProfile(
        userName,
        password,
        userId as string
      );
      if (response.data?.flag) {
        setScreenMessage("Great, your profile has been updated!");
      }
      else {
        setScreenError("Something went wrong updating your profile")
      }
    }
    else {
      setScreenError("Wrong credentials");
    }
  };

  useEffect(() => {
    getMetaData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.root}>
        <HeadLineComponent value="Welcome to User Profile Screen!" />

        <InputComponent placeholder="userName" value={userName} setValue={setUserName} />

        <InputComponent
          placeholder="New Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <InputComponent
          placeholder="Repeat New Password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
        />

        <ButtonComponent text="Update" onPress={onUpdateProfile} />

        <Text style={styles.successMessage}>{screenMessage}</Text>
        <Text style={styles.error}>{screenError}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    // alignItems: "center",
    padding: 40,
    minWidth:250
  },

  successMessage: {
    color: "green",
    fontSize: 14,
    textAlign: "center"
  },

  error: {
    color: "tomato",
    fontSize: 14,
  },

});
