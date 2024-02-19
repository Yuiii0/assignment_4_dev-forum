import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import prismaClient from "../prisma/client.prisma";

const freePassRoutes = ["/auth/sign-up", "/auth/log-in", "/"];

export default async function authenticator(
  req: any,
  res: Response,
  next: NextFunction
) {
  if (freePassRoutes.includes(req.url)) return next();

  const accessToken = req.headers.authorization?.split("Bearer ")[1];
  if (!accessToken) return res.sendStatus(401);

  try {
    const { sub: userId } = jwt.verify(accessToken, JWT_SECRET_KEY);

    const user = await prismaClient.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) return res.sendStatus(404);

    req.user = user;
  } catch (e) {
    return res.sendStatus(401);
  }
  next();
}
