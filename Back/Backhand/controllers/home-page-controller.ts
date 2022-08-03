import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/user-model";
import Post from "../models/post-model";

const SavePost = async (req: Request, res: Response) => {
  console.log(req.body);
  const post = new Post({
    userId: req.body.userId,
    userName: "",
    date: new Date(),
    text: req.body.text,
  });

  if (post.text == null || post.text == undefined) {
    console.log("text failure");
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ messgae: "Add some text to your post" });
  }

  console.log("post.id= " + post.userId);
  
  if (post.userId == null || post.userId == undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "There was problem finding the user by Id" });
  }

  try {
    const user = await User.findOne({ _id: post.userId });
    if (user == null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ messgae: "There was problem saving the user" });
    }
    post.userName = user.userName;

    await post.save();
    res.status(StatusCodes.OK).send({
      flag: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

const GetAllPosts = async (req: Request, res: Response) => {
  console.log("getAllPosts");
  try {
    let posts = await Post.find();
    let filteredPosts = posts.map((post) => {
      return {
        userName: post.userName,
        date: post.date,
        text: post.text,
      };
    });
    console.log(filteredPosts);
    
    return res.status(StatusCodes.OK).send({
      posts: filteredPosts
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

export { SavePost, GetAllPosts };
