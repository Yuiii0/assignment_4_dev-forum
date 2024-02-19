import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
declare class UsersService {
    createUser(req: Request<never, unknown, {
        email: string;
        password: string;
        nickname: string;
        name: string;
        gender: string;
        age: number;
    }>, res: Response<Omit<User, "encryptedPassword">>, next: NextFunction): Promise<void>;
    getUsers(_: Request, res: Response): Promise<void>;
    getUser(req: Request<{
        userId: string;
    }>, res: Response): Promise<void>;
    updateUser(req: Request<{
        userId: string;
    }, Omit<User, "encryptedPassword">, {
        email: string;
    }>, res: Response<Omit<User, "encryptedPassword">>): Promise<void>;
    deleteUser(req: Request<{
        userId: string;
    }>, res: Response, next: NextFunction): Promise<void>;
}
declare const usersService: UsersService;
export default usersService;
//# sourceMappingURL=users.service.d.ts.map