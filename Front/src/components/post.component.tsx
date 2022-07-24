import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Post } from "../types";

export const PostComponent: FC<{
  post: Post;
}> = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.userName}>{post.userName}</Text>
      <Text numberOfLines={4} ellipsizeMode='tail' style={styles.text}>{post.text}</Text>
      <Text style={styles.date}>{`${post.date?.toLocaleDateString()} ${post.date?.toLocaleTimeString()}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "white",
    height: "10rem",
    borderRadius: 12,
    marginVertical: 10,
    padding: 4
  },

  userName:{
    opacity: 0.6,
  },

  text:{
    fontSize: 18,
    marginTop:4,
    height:"7rem",

  },

  date:{
    position: "relative",
    // top: "30%",
    left: "66%",
    opacity: 0.6
  }
});
