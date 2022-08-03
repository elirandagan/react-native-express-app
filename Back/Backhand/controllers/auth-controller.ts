import User from "../models/user-model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";


const generateTokens = (userId: Types.ObjectId | string): [string, string] => {
  const accessToken = jwt.sign(
    { _id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRATION }
  );
  const refreshToken = jwt.sign(
    { _id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    {}
  );
  return [accessToken, refreshToken];
};

const Register = async (req: Request, res: Response) => {
  console.log("register");
  //validate userName/password
  const userName = req.body.userName;
  const password = req.body.password;
  console.log(`req data: ${userName} ${password}`);
  if (
    userName == null ||
    userName == undefined ||
    password == null ||
    password == undefined
  ) {
    console.log("register failed validation")
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ messgae: "userName or Password was empty" });
  }


  //encrypt password
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    userName: userName,
    password: encryptedPassword,
  });

  console.log(user)
  try {
    const newUser = await user.save();
    //login - create access token
    const [accessToken, refreshToken] = generateTokens(newUser._id);
    newUser.refreshToken = refreshToken;
    await newUser.save();
    console.log("success register");
    res.status(StatusCodes.OK).send({
      access_token: accessToken,
      refresh_token: refreshToken,
      _id: newUser._id,
    });
  } catch (err) {
    console.log(err)
    return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

const Login = async (req: Request, res: Response) => {
  const userName = req.body.userName;
  const password = req.body.password;
  if (
    userName == null ||
    userName == "" ||
    password == "" ||
    password == null
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ messgae: "Enter userName & Password" });
  }

  try {
    // check password match
    const user = await User.findOne({ userName: userName });
    if (user == null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ messgae: "Wrong Password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ messgae: "Wrong Password" });
    }

    const [accessToken, refreshToken] = generateTokens(user._id);
    user.refreshToken = refreshToken;
    
    await user.save();

    res.status(StatusCodes.OK).send({
      access_token: accessToken,
      refresh_token: refreshToken,
      _id: user._id,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

const RenewToken = async (req: Request, res: Response) => {
  console.log("renewToken");
  // validate refresh token
  let token = req.headers["authorization"];
  if (token == undefined || token == null) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }
  token = token.split(" ")[1];

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userId) => {
    console.log("jwt.verify");
    if (err != null) {
      return res.status(StatusCodes.FORBIDDEN).send({ err: err.message });
    }
    try {
      const id: string = userId["_id"];
      const user2 = await User.findById(id);
      if (user2.refreshToken != token) {
        user2.refreshToken = "";
        await user2.save();
        console.log("refresh token not valid - not present in DB");
        return res.status(StatusCodes.FORBIDDEN).send({ error: err.message });
      }

      const [accessToken, refreshToken] = generateTokens(id);
      user2.refreshToken = refreshToken;
      await user2.save();
      console.log("StatusCodes.OK");
      res.status(StatusCodes.OK).send({
        access_token: accessToken,
        refresh_token: refreshToken,
        _id: id,
      });
    } catch (err) {
      return res.status(StatusCodes.FORBIDDEN).send({ error: err.message });
    }
  });
};

export { Register, Login, RenewToken };
