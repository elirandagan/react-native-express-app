import React, { FC, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
// import ApiService from "../../services/api-service";
import { SavePost } from "../../services";
import { InputComponent, HeadLineComponent, ButtonComponent } from "./index";

export const NewPostComponent: FC<{}> = () => {
  const [post, setPost] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onPressPost = async () => {
    console.log("post pressed");
    try {
      if (!!post) {
        const userId = await AsyncStorage.getItem("_USER_ID");
        const response = await SavePost(userId as string, post);
        console.log(response.data);
        if (response.ok && response?.data?.flag) {
          setMessage("Great, your post has been saved!");
          setError("");
        }
      }
      else{
        setError("Enter post first, than upload it")
        setMessage("");
      }
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };
  return (
    <View>
      <HeadLineComponent value="What U want to post?" />
      <InputComponent
        setValue={setPost}
        value={post}
        placeholder="Here you can write your post!"
      />
      <Text style={styles.successMessage}>{message}</Text>
      <Text style={styles.error}>{error}</Text>
      <ButtonComponent text="Post" onPress={onPressPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  successMessage: {
    color: "green",
    fontSize: 14,
    textAlign: "center",
  },

  error: {
    color: "tomato",
    fontSize: 14,
    textAlign: "center",
  },
});
