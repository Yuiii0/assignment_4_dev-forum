import { NextFunction, Request, Response } from "express";
declare class PostsService {
    createPost(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPosts(req: Request, res: Response): Promise<void>;
    getPost(req: Request<{
        postId: string;
    }>, res: Response): Promise<void>;
    updatePost(req: Request<{
        postId: string;
    }, {
        title: string;
        content: string;
    }>, res: Response, next: NextFunction): Promise<void>;
    deletePost(req: Request<{
        postId: string;
    }>, res: Response, next: NextFunction): Promise<void>;
}
declare const postsService: PostsService;
export default postsService;
//# sourceMappingURL=posts.service.d.ts.map