import express from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import { Login, Register } from "./controllers/auth-controller";
import { GetMetaData, UpdateProfile } from "./controllers/profile-controller";
import { SavePost, GetAllPosts } from "./controllers/home-page-controller";
import { GetUserPosts, DeletePost, UpdatePost } from "./controllers/my-posts-contoller";
import authMiddleware from "./middlewares/auth-middleware";

const cors = require("cors");
const app = express();

app.use(bodyparser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyparser.json());
app.use(cors());
dotenv.config();

import mongoose from "mongoose";
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("connected to mongo");
});

console.log("server is starting");

app.get("/home", (req, res) => {
  res.send("Home page");
});

app.get("/", (req, res) => {
  res.send("Default page");
});

app.post("/auth/register", Register);

app.post("/auth/login", Login);

app.post("/profile/metaData", GetMetaData);

app.post("/profile/update",authMiddleware, UpdateProfile);

app.post("/home-page/save-post",authMiddleware, SavePost);

app.get("/home-page/posts", GetAllPosts);

app.get("/my-posts/posts/:userId", GetUserPosts);

app.post("/my-posts/delete", authMiddleware, DeletePost);

app.post("/my-posts/update",authMiddleware, UpdatePost);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
