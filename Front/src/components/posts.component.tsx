import React, { FC, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Post, MyPost } from "../types";
import { HeadLineComponent, PostComponent } from "./index";


export const PostsComponent: FC<{
  callback?: () => void;
  posts: Post[] | MyPost[] | undefined;
}> = ({ posts, callback }) => {

  var key = 0;

  useEffect(() =>{
    console.log(posts);
    if(callback){
      console.log("posts callback");
      
    }
  },[posts])

  return (
    <View style={styles.root}>
      {posts instanceof Array<Post> ? (<HeadLineComponent value="Lets see what's your posts all about" />) : (<HeadLineComponent value="My posts only" />)}
      
      <ScrollView>
        {posts?.map((post) => (
          <PostComponent key={++key} post={post} callback={callback} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root:{
    // width: 100,
  }
});
