import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Post from "../models/post-model";
import authMiddleware from "./../middlewares/auth-middleware";
import express from 'express'
const router = express.Router()

const GetUserPosts = async (req: Request, res: Response) => {
  console.log("GetUserPosts");
  var id = req.params.userId;
  try {
    let posts = await Post.find({ userId: id });
    console.log(posts);
    return res.status(StatusCodes.OK).send({
      posts: posts,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

const DeletePost = async (req: Request, res: Response) => {
  console.log("DeletePost");
  var p_id = req.body.postId;
  if (p_id) {
    try {
      let post = await Post.find({ _id: p_id });
      if(!!post){
        await Post.deleteOne({_id: p_id});
        return res.status(StatusCodes.OK).send({
            flag: true,
          });
      }
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
    }
  }
  return res.status(StatusCodes.BAD_REQUEST).send({ error: "Didnt get postId" });
};

const UpdatePost = async (req: Request, res: Response) => {
    console.log("UpdatePost");
    var p_id = req.body.postId;
    var p_text = req.body.text;
    if (!!p_id && !!p_text) {
      try {
        let post = await Post.find({ _id: p_id });
        if(!!post){
          await Post.findOneAndUpdate({_id: p_id}, {text : p_text});
          return res.status(StatusCodes.OK).send({
              flag: true,
            });
        }
      } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
      }
    }
    return res.status(StatusCodes.BAD_REQUEST).send({ error: "Didnt get postId || text" });
};


router.get("/posts/:userId", GetUserPosts);

router.post("/delete",authMiddleware, DeletePost);

router.post("/update",authMiddleware, UpdatePost);


export = router
