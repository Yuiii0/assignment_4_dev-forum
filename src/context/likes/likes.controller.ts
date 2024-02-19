import { Router } from "express";
import likesService from './likes.service';

const likesController = Router();

likesController.get("/", likesService.getLikedPosts);
likesController.post("/:postId", likesService.toggleLike);

export default likesController;
