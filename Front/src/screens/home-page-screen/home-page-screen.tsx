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
  const [postsLength, setPostsLength] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      if (postsLength !== posts?.length) {
        activateLoader(true);
      }
      try {
        const response = await GetAllPosts();
        if (response.ok) {
          var resData : any = response?.data;
          var data = plainToInstance(Post, resData?.posts as Post[]);
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
    getPosts();
  }, [posts]);

  return (
    <ScrollView>
      {loader ? (
        <ScreenLoaderComponent />
      ) : (
        <View style={styles.root}>
          <View style={styles.selfPostSection}>
            <NewPostComponent  />
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
    width: 300,
    borderBottomColor: "#3b71f382",
    borderBottomWidth: 2,
  },

  postsSection: {
    marginTop: 20,
  },
});
