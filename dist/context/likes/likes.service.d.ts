import { NextFunction, Response } from "express";
declare class LikesService {
    toggleLike(req: any, res: Response, next: NextFunction): Promise<void>;
    getLikedPosts(req: any, res: Response, next: NextFunction): Promise<void>;
}
declare const likesService: LikesService;
export default likesService;
//# sourceMappingURL=likes.service.d.ts.map