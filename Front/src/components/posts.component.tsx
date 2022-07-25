import React, { FC, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Post, Posts } from "../types";
import { HeadLineComponent, PostComponent } from "./index";

export const PostsComponent: FC<{
  posts: Post[] | undefined;
}> = ({ posts }) => {
  var key = 0;
  var testPost: Post = {
    userName: "userName",
    date: new Date(),
    text: "First post here! very excited.",
  };

  useEffect(() =>{
    console.log(posts);
    
  })

  return (
    <View>
      <HeadLineComponent value="Lets see what's your posts all about" />
      <ScrollView>
        {posts?.map((post) => (
          <PostComponent key={++key} post={post} />
        ))}
        {/* <PostComponent post={testPost} />
        <PostComponent post={testPost} /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
