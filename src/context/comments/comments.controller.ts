import { Router } from "express";
import commentService from "./comments.service";

const commentsController = Router();

commentsController.post("/", commentService.createComment);
commentsController.get("/", commentService.getCommentsByPostId);
commentsController.get("/all", commentService.getAllComments);
commentsController.get("/:commentId", commentService.getComment);
commentsController.put("/:commentId", commentService.updateComment);
commentsController.delete("/:commentId", commentService.deleteComment);

export default commentsController;
