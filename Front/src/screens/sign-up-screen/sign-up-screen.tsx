import React, { FC, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  InputComponent,
  ButtonComponent,
  SocialButtons,
} from "../../components";
import { useNavigation } from "@react-navigation/native";
import { NavigationScreens, TabNavigationScreens } from "../../enums/index";
// import ApiService from "../../../services/api-service";
import { RegisterUser } from "../../../services";

export const SignUpScreen: FC<{}> = () => {
  // const [userName, setUserName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [screenError, setScreenError] = useState("");

  const navigation = useNavigation();

  const onRegisterInPressed = async () => {
    console.log("Register");
    //validation
    try {
      const response = await RegisterUser(userName, password);
      if (response.ok) {
        console.log(response.data);
        navigation.navigate(NavigationScreens.TabNavigator);
      }
    } catch (error: any) {
      setScreenError(error.message);
      console.log(error.message);
    }
  };

  const onSignIn = () => {
    console.log("sign In");
    //validation
    navigation.navigate(NavigationScreens.SignIn);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an Account</Text>
        <InputComponent
          placeholder="userName"
          value={userName}
          setValue={setUserName}
        />
        <InputComponent
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <InputComponent
          placeholder="Repeat Password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
        />
        <Text style={styles.error}>{screenError}</Text>
        <ButtonComponent text="Register" onPress={onRegisterInPressed} />

        <Text style={styles.text}>
          By registering, you confirm that your accept our term and private
          policy
        </Text>

        <SocialButtons />

        <ButtonComponent
          text="Have an Account already? Sign in here"
          onPress={onSignIn}
          type="tertiary"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 25,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },

  text: {
    color: "gray",
    marginVertical: 10,
  },

  error: {
    color: "tomato",
    fontSize: 14,
  },
});
