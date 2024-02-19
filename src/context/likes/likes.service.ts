import { NextFunction, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class LikesService {
  async toggleLike(req: any, res: Response, next: NextFunction) {
    try {
      const parsedPostId = Number(req.params.postId);
      if (isNaN(parsedPostId)) throw new Error("postId가 숫자가 아닙니다");
      const userId = req.user.id;

      //좋아요 여부 확인
      const exisitingLike = await prismaClient.like.findUnique({
        where: {
          postId: parsedPostId,
          userId: userId,
        },
      });

      //좋아요된 경우 - 취소
      if (exisitingLike) {
        await prismaClient.like.delete({
          where: {
            postId: parsedPostId,
            userId: userId,
          },
        });
        res.status(200).json({ message: "좋아요가 취소되었습니다." });
      } else {
        //좋아요 추가
        await prismaClient.like.create({
          data: {
            postId: parsedPostId,
            userId: userId,
          },
          select: {
            postId: true,
            userId: true,
            createdAt: true,
          },
        });
        res.status(201).json({ message: "좋아요가 추가되었습니다." });
      }
    } catch (e) {
      next(e);
    }
  }
  async getLikedPosts(req: any, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const likedPosts = await prismaClient.like.findMany({
        where: {
          userId,
        },
        include: {
          post: true,
        },
      });
      res.json(likedPosts);
    } catch (e) {
      next(e);
    }
  }
}

const likesService = new LikesService();
export default likesService;
