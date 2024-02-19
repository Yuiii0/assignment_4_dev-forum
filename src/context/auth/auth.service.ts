import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config";
import prismaClient from "../../prisma/client.prisma";

class AuthService {
  async signUp(
    req: Request<
      never,
      unknown,
      {
        email: string;
        password: string;
        nickname: string;
        name: string;
        gender: string;
        age: number;
      }
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password, name, gender, age } = req.body;
      // if (!email.trim()) throw new Error("No email");
      // if (!password.trim()) throw new Error("No password");

      const encryptedPassword = await bcrypt.hash(password, 12);

      const user = await prismaClient.user.create({
        data: {
          email,
          encryptedPassword,
          profile: { create: { name, gender, age } },
        },
        select: { id: true, email: true, encryptedPassword: true },
      });

      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async logIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      //email로 사용자 찾기
      const user = await prismaClient.user.findUnique({
        where: { email },
      });
      //사용자 존재x
      if (!user) {
        return res
          .status(404)
          .json({ message: "유효하지 않은 이메일 또는 비밀번호 입니다." });
      }

      const isVerified = await bcrypt.compare(password, user.encryptedPassword);

      //비밀번호 불일치
      if (!isVerified)
        return res
          .status(400)
          .json({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });

      //JWT 토큰 생성
      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
        subject: user.id.toString(),
      });
      res.json(accessToken);
    } catch (e) {
      next(e);
    }
  }
}
const authService = new AuthService();

export default authService;
