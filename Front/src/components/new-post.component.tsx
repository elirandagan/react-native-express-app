import React, { FC, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import ApiService from "../../services/api-service";
import { InputComponent, HeadLineComponent, ButtonComponent } from "./index";

export const NewPostComponent: FC<{}> = () => {
  const [post, setPost] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onPressPost = async () => {
    console.log("post pressed");
    try {
      const userId = await AsyncStorage.getItem("_USER_ID");
      const response = await ApiService.SavePost(userId, post);
      console.log(response.data);
      if (response.data.flag) {
        setMessage("Great, your post has been saved!");
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
  },

  error: {
    color: "tomato",
    fontSize: 14,
  },
});
