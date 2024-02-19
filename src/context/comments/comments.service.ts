import { NextFunction, Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class CommentService {
  //CREATE
  async createComment(req: any, res: Response, next: NextFunction) {
    try {
      const { postId, content } = req.body;
      const userId = req.user.id;

      const comment = await prismaClient.comment.create({
        data: {
          content,
          postId: Number(postId),
          userId,
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          postId: true,
          userId: true,
        },
      });

      res.json(comment);
    } catch (e) {
      next(e);
    }
  }

  //READ
  async getComment(
    req: Request<{ commentId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commentId = Number(req.params.commentId);
      if (isNaN(commentId)) throw new Error("CommentId는 숫자가 아닙니다");

      const comment = await prismaClient.comment.findUnique({
        where: { id: commentId },
      });
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
  async getAllComments(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await prismaClient.comment.findMany();
      res.json(posts);
    } catch (e) {
      next(e);
    }
  }
  async getCommentsByPostId(
    req: Request<{ postId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const postId = Number(req.params.postId);
      if (isNaN(postId)) throw new Error("PostId가 숫자가 아닙니다");

      const comments = await prismaClient.comment.findMany({
        where: { postId },
      });
      res.json(comments);
    } catch (e) {
      next(e);
    }
  }

  //UPDATE
  async updateComment(
    req: Request<{ commentId: string }, { content: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commentId = Number(req.params.commentId);
      if (isNaN(commentId)) throw new Error("CommentId가 숫자가 아닙니다.");

      const { content } = req.body;

      const comment = await prismaClient.comment.update({
        where: { id: commentId },
        data: { content },
        select: {
          id: true,
          content: true,
          createdAt: true,
          postId: true,
          userId: true,
        },
      });
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }

  //DELETE
  async deleteComment(
    req: Request<{ commentId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commentId = Number(req.params.commentId);
      if (isNaN(commentId)) throw new Error("CommentId가 숫자가 아닙니다.");

      await prismaClient.comment.delete({ where: { id: commentId } });

      res.json(commentId);
    } catch (e) {
      next(e);
    }
  }
}
const commentService = new CommentService();
export default commentService;
