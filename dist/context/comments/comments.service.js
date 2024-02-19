"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_prisma_1 = __importDefault(require("../../prisma/client.prisma"));
class CommentService {
    //CREATE
    createComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId, content } = req.body;
                const userId = req.user.id;
                const comment = yield client_prisma_1.default.comment.create({
                    data: {
                        content,
                        postId: Number(postId),
                        userId,
                    },
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        postId: true,
                        userId: true,
                    },
                });
                res.json(comment);
            }
            catch (e) {
                next(e);
            }
        });
    }
    //READ
    getComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = Number(req.params.commentId);
                if (isNaN(commentId))
                    throw new Error("CommentId는 숫자가 아닙니다");
                const comment = yield client_prisma_1.default.comment.findUnique({
                    where: { id: commentId },
                });
                res.json(comment);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAllComments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield client_prisma_1.default.comment.findMany();
                res.json(posts);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getCommentsByPostId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = Number(req.params.postId);
                if (isNaN(postId))
                    throw new Error("PostId가 숫자가 아닙니다");
                const comments = yield client_prisma_1.default.comment.findMany({
                    where: { postId },
                });
                res.json(comments);
            }
            catch (e) {
                next(e);
            }
        });
    }
    //UPDATE
    updateComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = Number(req.params.commentId);
                if (isNaN(commentId))
                    throw new Error("CommentId가 숫자가 아닙니다.");
                const { content } = req.body;
                const comment = yield client_prisma_1.default.comment.update({
                    where: { id: commentId },
                    data: { content },
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        postId: true,
                        userId: true,
                    },
                });
                res.json(comment);
            }
            catch (e) {
                next(e);
            }
        });
    }
    //DELETE
    deleteComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = Number(req.params.commentId);
                if (isNaN(commentId))
                    throw new Error("CommentId가 숫자가 아닙니다.");
                yield client_prisma_1.default.comment.delete({ where: { id: commentId } });
                res.json(commentId);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
const commentService = new CommentService();
exports.default = commentService;
