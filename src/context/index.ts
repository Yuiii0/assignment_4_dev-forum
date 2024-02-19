import { Router } from "express";
import authController from "./auth/auth.controller";
import commentsController from "./comments/comments.controller";
import homeController from "./home/home.controller";
import likesController from "./likes/likes.controller";
import postsController from "./posts/posts.controller";
import usersController from "./users/users.controller";

const controllers = Router();

controllers.use("/", homeController);
controllers.use("/users", usersController);
controllers.use("/auth", authController);
controllers.use("/posts", postsController);
controllers.use("/comments", commentsController);
controllers.use("/like-post", likesController);

export default controllers;
