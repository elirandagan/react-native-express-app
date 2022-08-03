import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { LogOut } from "../../../services";
import { NavigationScreens } from "../../enums";

export const LogOutScreen: FC<{}> = () => {
    const navigation = useNavigation();

  const logOut = async () => {
    try {
      const userId = await AsyncStorage.getItem("_USER_ID");
      if (!!userId) {
        const response = await LogOut(userId);
        if(!!response){
            AsyncStorage.clear();
            navigation.navigate(NavigationScreens.SignIn);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    logOut();
  }, []);

  return (
    <View></View>
  )
};
