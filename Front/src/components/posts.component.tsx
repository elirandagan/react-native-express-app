import React, { FC } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Post, Posts } from "../types";
import { HeadLineComponent, PostComponent } from "./index";

export const PostsComponent: FC<{
  posts: Array<Post> | undefined;
}> = ({ posts }) => {
  var testPost: Post = {
    userName: "userName",
    date: new Date(),
    text: "First post here! very excited.",
  };
  return (
    <View>
      <HeadLineComponent value="Lets see what's your posts all about" />
      <ScrollView>
        <PostComponent post={testPost} />
        <PostComponent post={testPost} />
      </ScrollView >
    </View>
  );
};

const styles = StyleSheet.create({});
