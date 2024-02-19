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
class PostsService {
    //CREATE
    createPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content } = req.body;
                if (!title.trim())
                    throw new Error("타이틀을 입력해주세요");
                if (!content.trim())
                    throw new Error("타이틀을 입력해주세요");
                const newPost = yield client_prisma_1.default.post.create({
                    data: { title, content },
                    select: {
                        title: true,
                        content: true,
                        createdAt: true,
                    },
                });
                res.json(newPost);
            }
            catch (e) {
                next(e);
            }
        });
    }
    //READ
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield client_prisma_1.default.post.findMany();
            res.json(posts);
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedPostId = Number(req.params.postId);
            if (isNaN(parsedPostId))
                throw new Error("postId가 숫자가 아닙니다");
            const post = yield client_prisma_1.default.post.findUnique({
                where: { id: parsedPostId },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                },
            });
            res.json(post);
        });
    }
    //UPDATE
    updatePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedPostId = Number(req.params.postId);
                if (isNaN(parsedPostId))
                    throw new Error("postId가 숫자가 아닙니다");
                const { title, content } = req.body;
                const post = yield client_prisma_1.default.post.update({
                    where: { id: parsedPostId },
                    data: { title, content },
                });
                res.json(post);
            }
            catch (e) {
                next(e);
            }
        });
    }
    //DELETE
    deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedPostId = Number(req.params.postId);
                if (isNaN(parsedPostId))
                    throw new Error("postId가 숫자가 아닙니다");
                yield client_prisma_1.default.post.delete({ where: { id: parsedPostId } });
                res.json(parsedPostId);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
const postsService = new PostsService();
exports.default = postsService;
