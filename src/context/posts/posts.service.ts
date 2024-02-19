import { NextFunction, Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class PostsService {
  //CREATE
  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content } = req.body;
      if (!title.trim()) throw new Error("타이틀을 입력해주세요");
      if (!content.trim()) throw new Error("타이틀을 입력해주세요");

      const newPost = await prismaClient.post.create({
        data: { title, content },
        select: {
          title: true,
          content: true,
          createdAt: true,
        },
      });
      res.json(newPost);
    } catch (e) {
      next(e);
    }
  }

  //READ
  async getPosts(req: Request, res: Response) {
    const posts = await prismaClient.post.findMany();
    res.json(posts);
  }
  async getPost(req: Request<{ postId: string }>, res: Response) {
    const parsedPostId = Number(req.params.postId);
    if (isNaN(parsedPostId)) throw new Error("postId가 숫자가 아닙니다");

    const post = await prismaClient.post.findUnique({
      where: { id: parsedPostId },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });
    res.json(post);
  }

  //UPDATE
  async updatePost(
    req: Request<{ postId: string }, { title: string; content: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const parsedPostId = Number(req.params.postId);
      if (isNaN(parsedPostId)) throw new Error("postId가 숫자가 아닙니다");

      const { title, content } = req.body;

      const post = await prismaClient.post.update({
        where: { id: parsedPostId },
        data: { title, content },
      });
      res.json(post);
    } catch (e) {
      next(e);
    }
  }

  //DELETE
  async deletePost(
    req: Request<{ postId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const parsedPostId = Number(req.params.postId);
      if (isNaN(parsedPostId)) throw new Error("postId가 숫자가 아닙니다");

      await prismaClient.post.delete({ where: { id: parsedPostId } });

      res.json(parsedPostId);
    } catch (e) {
      next(e);
    }
  }
}

const postsService = new PostsService();
export default postsService;
