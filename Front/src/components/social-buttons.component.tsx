import React, { FC } from "react";
import { View } from "react-native";
import { ButtonComponent } from "./button.component";

export const SocialButtons: FC<{}> = () => {
  const onSignInFacebook = () => {
    console.log("facebook");
  };

  const onSignInGoogle = () => {
    console.log("google");
  };
  
  return (
    <>
      <ButtonComponent
        text="Sign In With Facebook"
        onPress={onSignInFacebook}
        backColor="#E7EAF4"
        fgColor="#4765A9"
      />

      <ButtonComponent
        text="Sign In With Goggle"
        onPress={onSignInGoogle}
        backColor="#FAE9EA"
        fgColor="#DD4D44"
      />
    </>
  );
};
