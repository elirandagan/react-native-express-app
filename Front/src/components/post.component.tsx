import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import ApiService from "../../services/api-service";
import { MyPost, Post } from "../types";
import { ButtonComponent } from "./button.component";
import { InputComponent } from "./input-text.component";

export const PostComponent: FC<{
  post: Post | MyPost;
}> = ({ post }) => {
  const [message, SetMessage] = useState<String>("");
  const [showInput, setShowInput] = useState<Boolean>(false);
  const [newText, setNewText] = useState("");
  const onDeletePost = async () => {
    if (post instanceof MyPost) {
      try {
        const response = await ApiService.DeletePost(post._id);
        if (!!response) {
          SetMessage("Your post has been deleted");
        }
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  const onUpdatePost = () => {
    if (post instanceof MyPost) {
      setShowInput(true);
    }
  };

  const updatePost = async () => {
    try {
      if (post instanceof MyPost){
        const response = await ApiService.UpdatePost(post._id, newText);
        if(!!response){
          SetMessage("Your post has been updated");
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(post);
    console.log(post instanceof Post);
  }, []);

  return (
    <View>
      <View style={styles.postContainer}>
        <Text style={styles.userName}>{post.userName}</Text>
        <Text numberOfLines={4} ellipsizeMode="tail" style={styles.text}>
          {post.text}
        </Text>
        <Text style={styles.date}>{post.date}</Text>
        {post instanceof MyPost && (
          <Pressable style={styles.deleteButton} onPress={onDeletePost}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        )}
        {post instanceof MyPost && (
          <Pressable style={styles.updateButton} onPress={onUpdatePost}>
            <Text style={styles.updateText}>Update</Text>
          </Pressable>
        )}
      </View>
      {!!showInput && (
        <InputComponent
          value={newText}
          placeholder="Enter the new text here"
          setValue={setNewText}
        />
      )}
      {!!showInput && <ButtonComponent text="Update Post" backColor="#0074b6" onPress={updatePost} />}
      <Text style={styles.successMessage}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "white",
    height: "10rem",
    borderRadius: 12,
    marginVertical: 10,
    padding: 4,
  },

  userName: {
    opacity: 0.6,
  },

  text: {
    fontSize: 18,
    marginTop: 4,
    height: "7rem",
  },

  date: {
    position: "relative",
    // top: "30%",
    left: "66%",
    opacity: 0.6,
  },

  deleteButton: {
    position: "absolute",
    top: "85%",
    display: "block",
  },

  deleteText: {
    color: "tomato",
  },
  updateButton: {
    position: "absolute",
    top: "85%",
    left: "18%",
    display: "block",
  },

  updateText: {
    color: "#0074b6",
  },

  successMessage: {
    color: "green",
    fontSize: 14,
    textAlign: "center",
  },
});
function updateState(arg0: {}): any {
  throw new Error("Function not implemented.");
}
