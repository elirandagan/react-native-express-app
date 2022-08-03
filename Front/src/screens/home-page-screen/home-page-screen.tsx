import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
// import ApiService from "../../../services/api-service";
import { GetAllPosts } from "../../../services";
import {
  PostsComponent,
  NewPostComponent,
  ScreenLoaderComponent,
} from "./../../components";
import { Post } from "../../types";
import { plainToInstance } from "class-transformer";

export const HomePageScreen: FC<{}> = () => {
  const [loader, activateLoader] = useState(false);
  const [posts, setPosts] = useState<Post[]>();

  const getPosts = async () => {
    activateLoader(true);
    try {
      const response = await GetAllPosts();
      if (response.ok) {
        var data = plainToInstance(Post, response?.data?.posts as Post[]);
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

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ScrollView>
      {loader ? (
        <ScreenLoaderComponent />
      ) : (
        <View style={styles.root}>
          <View style={styles.selfPostSection}>
            <NewPostComponent />
          </View>
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
  selfPostSection: {
    width: "-webkit-fill-available",
    borderBottomColor: "#3b71f382",
    borderBottomWidth: 2,
  },

  postsSection: {
    marginTop: 20,
  },
});
