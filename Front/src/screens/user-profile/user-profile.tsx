import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ApiService from "../../../services/api-service";
import AsyncStorage from "@react-native-community/async-storage";
import { InputComponent, ButtonComponent } from "../../components";

export const UserProfileScreen: FC<{}> = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [reapetPassword, setReapetPassword] = useState("");
  const [screenMessage, setScreenMessage] = useState("");
  const [screenError, setScreenError] = useState("");

  const getMetaData = async () => {
    const userId = await AsyncStorage.getItem("_USER_ID");
    if (!!userId) {
      const response = await ApiService.GetUserData(userId);
      if (!!response) {
        setUserName(response.data.userName);
      }
    }
  };

  const onUpdateProfile = async () => {
    //TODO: validation
    const userId = await AsyncStorage.getItem("_USER_ID");
    console.log(userId);

    const response = await ApiService.UpdateUserProfile(
      userName,
      password,
      userId
    );
    if (response.data?.flag) {
      setScreenMessage("Great, your profile has been updated!");
    }
    else{
      setScreenError("Something went wrong updating your profile")
    }
  };

  useEffect(() => {
    getMetaData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text>Welcome to User Profile Screen!</Text>

        <InputComponent placeholder="userName" value={userName} setValue={setUserName} />

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 25,
  },

  successMessage:{
    color: "green",
    fontSize: 14,
  },

  error: {
    color: "tomato",
    fontSize: 14,
  },

});
