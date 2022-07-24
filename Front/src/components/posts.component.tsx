import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
class Post {
    public readonly userName?: String;
    public readonly date?: Date;
    public readonly text?: String;
  }

export const PostsComponent: FC<{
  posts: Post[] | undefined;
}> = ({ posts }) => {
  return <View></View>;
};

const styles = StyleSheet.create({});
