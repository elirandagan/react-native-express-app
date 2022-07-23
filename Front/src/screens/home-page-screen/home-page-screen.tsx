import AsyncStorage from "@react-native-community/async-storage";
import React, { FC, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ApiService from "../../../services/api-service";
import { InputComponent, ButtonComponent, HeadLineComponent } from "./../../components";

export const HomePageScreen: FC<{}> = () => {
  const [post, setPost] = useState("");
  const [message, setMessage] = useState("");
  const placeholder = "Here you can write your post!";

  const onPressPost = async () => {
    console.log("post pressed");
    try{
      const userId = await AsyncStorage.getItem("_USER_ID");
      const response = await ApiService.SavePost(userId, post);
      console.log(response.data);
      if(response.data.flag){
        setMessage("Great, your post has been saved!")
      }
    } catch(err: any){
      console.log(err);
      
    }
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        <HeadLineComponent value="What U want to post?"/>
        <View style={styles.selfPostSection}>
          <InputComponent
            setValue={setPost}
            value={post}
            placeholder={placeholder}
          />
          <ButtonComponent text="Post" onPress={onPressPost} />
        </View>
        <View style={styles.postsSection}>
          <HeadLineComponent value="Lets see what's your posts all about" />

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 25,
  },
  selfPostSection: {
    width: "-webkit-fill-available",
    borderBottomColor: "#3b71f382",
    borderBottomWidth: 2,
  },

  postsSection:{
    marginTop: 20
  }
});
