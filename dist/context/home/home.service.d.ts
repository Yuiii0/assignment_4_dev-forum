import { NextFunction, Request, Response } from "express";
declare class HomeService {
    getLatestPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const homeService: HomeService;
export default homeService;
//# sourceMappingURL=home.service.d.ts.map