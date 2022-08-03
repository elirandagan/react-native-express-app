import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ApiService from "../../../services/api-service";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HeadLineComponent, PostsComponent } from "../../components";
import { MyPost } from "../../types";
import { plainToInstance } from "class-transformer";

export const MyPostsScreen: FC<{}> = () => {
  const [posts, setPosts] = useState<MyPost[]>();


  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const userId = await AsyncStorage.getItem("_USER_ID");
        const response = await ApiService.GetUserPosts(userId);
        if (!!response) {
          var data = plainToInstance(MyPost, response.data.posts as MyPost[]);
          if (!!data) {
            setPosts(data);
          }
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    getUserPosts();
  }, [posts]);

  return (
    <ScrollView>
      <View style={styles.root}>
        <HeadLineComponent value="My Posts" />
        <View style={styles.postsSection}>
          {posts != undefined && <PostsComponent posts={posts} />}
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

  postsSection: {
    marginTop: 20,
  },
});
