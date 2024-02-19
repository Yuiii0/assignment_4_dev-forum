import { NextFunction, Request, Response } from "express";
declare class AuthService {
    signUp(req: Request<never, unknown, {
        email: string;
        password: string;
        nickname: string;
        name: string;
        gender: string;
        age: number;
    }>, res: Response, next: NextFunction): Promise<void>;
    logIn(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const authService: AuthService;
export default authService;
//# sourceMappingURL=auth.service.d.ts.map