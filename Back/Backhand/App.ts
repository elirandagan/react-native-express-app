import express from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import auth_controller from "./controllers/auth-controller";
import profile_controller from "./controllers/profile-controller";
import home_page_controller from "./controllers/home-page-controller";
import my_post_controller from "./controllers/my-posts-contoller";

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

app.use("/auth", auth_controller);;

app.use("/profile", profile_controller);

app.use("/home-page", home_page_controller);

app.use("/my-posts", my_post_controller);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
