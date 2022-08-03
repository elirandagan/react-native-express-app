import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
// import ApiService from "../../../services/api-service";
import { GetUserPosts } from "../../../services";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeadLineComponent, PostsComponent,ScreenLoaderComponent} from "../../components";
import { MyPost } from "../../types";
import { plainToInstance } from "class-transformer";

export const MyPostsScreen: FC<{}> = () => {
  const [loader, activateLoader] = useState(false);
  const [posts, setPosts] = useState<MyPost[]>();

  useEffect(() => {
    const getUserPosts = async () => {
      activateLoader(true);
      try {
        const userId = await AsyncStorage.getItem("_USER_ID");
        const response = await GetUserPosts(userId as string);
        if (response.ok) {
          var data = plainToInstance(MyPost, response?.data?.posts as MyPost[]);
          if (!!data) {
            setPosts(data);
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
