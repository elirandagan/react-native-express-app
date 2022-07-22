import React, { FC, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationScreens } from "../enums/index";
import { TabNavigatorScreen, SignUpScreen, SignInScreen } from "../screens/index";

const Stack = createNativeStackNavigator();

export const Navigation: FC<{}> = () => {
  // const fetchApi = async () => {
  // };

  // useEffect(() => {
  //   fetchApi();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={NavigationScreens.SignIn}
          component={SignInScreen}
        ></Stack.Screen>
        <Stack.Screen
          name={NavigationScreens.SignUp}
          component={SignUpScreen}
        ></Stack.Screen>
        <Stack.Screen
          name={NavigationScreens.TabNavigator}
          component={TabNavigatorScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
