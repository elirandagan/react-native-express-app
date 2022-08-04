import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { GetUserPosts } from "../../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  HeadLineComponent,
  PostsComponent,
  ScreenLoaderComponent,
} from "../../components";
import { MyPost } from "../../types";
import { plainToInstance } from "class-transformer";

export const MyPostsScreen: FC<{}> = () => {
  const [loader, activateLoader] = useState(false);
  const [posts, setPosts] = useState<MyPost[]>();
  const [postsLength, setPostsLength] = useState(0);

  useEffect(() => {
    const getUserPosts = async () => {
      if (postsLength !== posts?.length) {
        activateLoader(true);
      }
      try {
        const userId = await AsyncStorage.getItem("_USER_ID");
        const response = await GetUserPosts(userId as string);
        if (response.ok) {
          var resData: any =  response?.data;
          var data = plainToInstance(MyPost, resData?.posts as MyPost[]);
          if (!!data) {
            setPosts(data);
            if (data.length !== postsLength) {
              setPostsLength(posts?.length ? posts.length : 0);
            }
          }
        }
      } catch (err: any) {
        console.log(err);
      } finally {
        activateLoader(false);
      }
    };
    getUserPosts();
  }, [posts]);

  return (
    <ScrollView>
      {loader ? (
        <ScreenLoaderComponent />
      ) : (
        <View style={styles.root}>
          <HeadLineComponent value="My Posts" />
          <View style={styles.postsSection}>
            {posts != undefined && <PostsComponent posts={posts} />}
          </View>
        </View>
      )}
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
