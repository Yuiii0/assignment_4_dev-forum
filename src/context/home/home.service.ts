import { NextFunction, Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class HomeService {
  async getLatestPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await prismaClient.post.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { users: true },
      });
      res.json(posts);
    } catch (e) {
      next(e);
    }
  }
}
const homeService = new HomeService();
export default homeService;
