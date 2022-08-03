import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import User from "../models/user-model";
import express from 'express'
const router = express.Router()

const GetMetaData = async (req: Request, res: Response) => {
  console.log("GetMetaData");
  console.log(req.body);

  const userId = req.body.userId;
  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ messgae: "not valid _id" });
  }

  try {
    const user = await User.findOne({ _id: userId });
    if (user == null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ messgae: "found problem finding the user data" });
    }

    res.status(StatusCodes.OK).send({
      userName: user.userName,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

const UpdateProfile = async (req: Request, res: Response) => {
  console.log("UpdateProfile");
  console.log(req.body);

  const newUserName = req.body.userName;
  const newPassword = req.body.password;
  const userId = req.body.userId;
  if (
    newUserName == null ||
    newUserName == undefined ||
    newPassword == null ||
    newPassword == undefined
  ) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ messgae: "userName or Password was empty" });
  }

  try {
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findOne({ _id: userId });
    if (user == null) {
        console.log("cant found user");
        
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ messgae: "found problem updating the user" });
    }

    await user.updateOne({
      userName: newUserName,
      password: encryptedPassword,
    });

    res.status(StatusCodes.OK).send({
      flag: true,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

router.post('/metaData', GetMetaData);

router.post('/update', UpdateProfile);

export = router
