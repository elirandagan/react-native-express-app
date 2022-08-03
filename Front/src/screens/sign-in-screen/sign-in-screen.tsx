import React, { FC, useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../assets/Logo.png";
import { NavigationScreens } from "../../enums/index";
import {
  InputComponent,
  ButtonComponent,
  SocialButtons,
} from "../../components";
// import ApiService from "../../../services/api-service";
import { LoginUser, LoginUserOnLoading } from "../../../services/api-service";
import AsyncStorage from "@react-native-community/async-storage";

export const SignInScreen: FC<{}> = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [screenError, setScreenError] = useState("");
  const navigation = useNavigation();

  const signInOnLoading = async () => {
    try{
      const uId = await AsyncStorage.getItem("_USER_ID");
      const rfsTkn = await AsyncStorage.getItem("_REFRESH_TKN");
      if(!!uId){
        const response = await LoginUserOnLoading(uId, rfsTkn as string);
        if(response.ok){
          setStorage(response.data);
          navigation.navigate(NavigationScreens.TabNavigator);
        }
      }
    } catch(error){
      console.log(error);
    }
  }

  const onSignInPressed = async () => {
    console.log("SignIn");
    try {
      const response = await LoginUser(userName, password);
      if (response.ok) {
        console.log("sign in response");
        console.log(response.data);

        // AsyncStorage.setItem("_ACCESS_TKN", response?.data?.access_token);
        // AsyncStorage.setItem("_REFRESH_TKN", response?.data?.refresh_token);
        // AsyncStorage.setItem("_USER_ID", response.data._id);

        setStorage(response.data);

        navigation.navigate(NavigationScreens.TabNavigator);
      }
    } catch (error: any) {
      setScreenError(error?.response?.data?.messgae);
      console.log(error);
    }
  };

  const setStorage = (data: any) => {
    AsyncStorage.setItem("_ACCESS_TKN", data?.access_token);
    AsyncStorage.setItem("_REFRESH_TKN", data?.refresh_token);
    AsyncStorage.setItem("_USER_ID", data._id);
  }

  const onSignUp = () => {
    console.log("sign up");
    navigation.navigate(NavigationScreens.SignUp);
  };

  useEffect(() =>{
    signInOnLoading();
    console.log("test");
    
  },[])

  const { height } = useWindowDimensions();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
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
        <Text style={styles.error}>{screenError}</Text>

        <ButtonComponent text="Sign In" onPress={onSignInPressed} />

        <SocialButtons />

        <ButtonComponent
          text="Create Account"
          onPress={onSignUp}
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

  logo: {
    width: 700,
    maxHeight: 200,
    maxWidth: 300,
  },

  error: {
    color: "tomato",
    fontSize: 14,
  },
});
