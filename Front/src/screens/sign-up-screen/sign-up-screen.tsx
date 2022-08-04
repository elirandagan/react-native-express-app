import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  InputComponent,
  ButtonComponent,
  SocialButtons,
  ScreenLoaderComponent,
} from "../../components";
import { useNavigation } from "@react-navigation/native";
import { NavigationScreens, TabNavigationScreens } from "../../enums/index";
import { RegisterUser } from "../../../services";

export const SignUpScreen: FC<{}> = () => {
  const [loader, activateLoader] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [screenError, setScreenError] = useState("");

  const navigation = useNavigation();

  const onRegisterInPressed = async () => {
    console.log("Register");
    if (userName && password && password === passwordRepeat) {
      activateLoader(true);
      try {
        const response = await RegisterUser(userName, password);
        if (response.ok) {
          console.log(response.data);
          navigation.navigate(NavigationScreens.TabNavigator as any);
        }
      } catch (error: any) {
        setScreenError(error.message);
        console.log(error.message);
      } finally {
        activateLoader(false);
      }
    }
    else {
      setScreenError("Wrong credentials");
    };
  }

  const onSignIn = () => {
    console.log("sign In");
    navigation.navigate(NavigationScreens.SignIn as any);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {loader ? (
        <ScreenLoaderComponent />
      ) : (
        <View style={styles.root}>
          <Text style={styles.title}>Create an Account</Text>
          <InputComponent
            placeholder="userName"
            value={userName}
            setValue={setUserName}
            minLength={"L"}
          />
          <InputComponent
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            minLength={"L"}
          />
          <InputComponent
            placeholder="Repeat Password"
            value={passwordRepeat}
            setValue={setPasswordRepeat}
            secureTextEntry={true}
            minLength={"L"}
          />
          <Text style={styles.error}>{screenError}</Text>
          <ButtonComponent text="Register" onPress={onRegisterInPressed} minLength={"L"} />
  
          <Text style={styles.text}>
            By registering, you confirm that your accept our term and private
            policy
          </Text>
  
          <SocialButtons />
  
          <ButtonComponent
            text="Have an Account already? Sign in here"
            onPress={onSignIn}
            type="tertiary"
            minLength={"L"}
          />
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
