import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { GetUserData, UpdateUserProfile } from "../../../services";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InputComponent, ButtonComponent, ScreenLoaderComponent, HeadLineComponent } from "../../components";

export const UserProfileScreen: FC<{}> = () => {
  const [loader, activateLoader] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [screenMessage, setScreenMessage] = useState("");
  const [screenError, setScreenError] = useState("");

  const getMetaData = async () => {
    activateLoader(true);
    try {
      const userId = await AsyncStorage.getItem("_USER_ID");
      if (!!userId) {
        const response = await GetUserData(userId);
        if (response.ok) {
          var resData : any =  response?.data
          setUserName(resData?.userName);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      activateLoader(false);
    }
  };

  const onUpdateProfile = async () => {
    //TODO: validation
    if (userName && password && password === passwordRepeat) {
      const userId = await AsyncStorage.getItem("_USER_ID");
      console.log(userId);

      activateLoader(true);
      try {
        const userId = await AsyncStorage.getItem("_USER_ID");
        const response = await UpdateUserProfile(
          userName,
          password,
          userId as string
        );
        var resData : any = response?.data;
        if (resData?.flag) {
          setScreenMessage("Great, your profile has been updated!");
        } else {
          setScreenError("Something went wrong updating your profile");
        }
      } catch (error) {
        console.log(error);
      } finally {
        activateLoader(false);
      }
    } else {
      setScreenError("Wrong Credentials");
    }
  }

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
          minLength={"L"}
        />

        <InputComponent
          placeholder="New Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          minLength={"L"}
        />

        <InputComponent
          placeholder="Repeat New Password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
          minLength={"L"}
        />

          <ButtonComponent text="Update" onPress={onUpdateProfile} minLength={"L"}/>

          <Text style={styles.successMessage}>{screenMessage}</Text>
          <Text style={styles.error}>{screenError}</Text>
        </View >
      )}
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  root: {
    // alignItems: "center",
    padding: 40,
    minWidth: 250
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
