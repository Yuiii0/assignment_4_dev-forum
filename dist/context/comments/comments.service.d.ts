import { NextFunction, Request, Response } from "express";
declare class CommentService {
    createComment(req: any, res: Response, next: NextFunction): Promise<void>;
    getComment(req: Request<{
        commentId: string;
    }>, res: Response, next: NextFunction): Promise<void>;
    getAllComments(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCommentsByPostId(req: Request<{
        postId: string;
    }>, res: Response, next: NextFunction): Promise<void>;
    updateComment(req: Request<{
        commentId: string;
    }, {
        content: string;
    }>, res: Response, next: NextFunction): Promise<void>;
    deleteComment(req: Request<{
        commentId: string;
    }>, res: Response, next: NextFunction): Promise<void>;
}
declare const commentService: CommentService;
export default commentService;
//# sourceMappingURL=comments.service.d.ts.map