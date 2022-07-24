import React, { FC, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import ApiService from "../../../services/api-service";
import { PostsComponent, NewPostComponent } from "./../../components";
import { Post } from "../../types";
import { plainToInstance } from "class-transformer";

export const HomePageScreen: FC<{}> = () => {
  const [posts, setPosts] = useState<Array<Post> | undefined>();
  const getPosts = async () => {
    try {
      const response = await ApiService.GetAllPosts();
      if (response) {
        var data = plainToInstance(Post, response.data.posts as Post[]);
        console.log(data);
        setPosts(data);
        console.log(posts);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.selfPostSection}>
          <NewPostComponent />
        </View>
        <View style={styles.postsSection}>
          <PostsComponent posts={posts} />
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

  postsSection: {
    marginTop: 20,
  },
});
