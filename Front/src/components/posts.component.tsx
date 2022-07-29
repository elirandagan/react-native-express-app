import React, { FC, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Post, MyPost } from "../types";
import { HeadLineComponent, PostComponent } from "./index";

export const PostsComponent: FC<{
  posts: Post[] | MyPost[] | undefined;
}> = ({ posts }) => {
  var key = 0;
  useEffect(() =>{
    console.log(posts);
  })

  return (
    <View style={styles.root}>
      {posts instanceof Array<Post> ? (<HeadLineComponent value="Lets see what's your posts all about" />) : (<HeadLineComponent value="My posts only" />)}
      
      <ScrollView>
        {posts?.map((post) => (
          <PostComponent key={++key} post={post} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root:{
    width: "100%",
  }
});
