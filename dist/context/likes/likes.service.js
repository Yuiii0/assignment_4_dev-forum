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
class LikesService {
    toggleLike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedPostId = Number(req.params.postId);
                if (isNaN(parsedPostId))
                    throw new Error("postId가 숫자가 아닙니다");
                const userId = req.user.id;
                //좋아요 여부 확인
                const exisitingLike = yield client_prisma_1.default.like.findUnique({
                    where: {
                        postId: parsedPostId,
                        userId: userId,
                    },
                });
                //좋아요된 경우 - 취소
                if (exisitingLike) {
                    yield client_prisma_1.default.like.delete({
                        where: {
                            postId: parsedPostId,
                            userId: userId,
                        },
                    });
                    res.status(200).json({ message: "좋아요가 취소되었습니다." });
                }
                else {
                    //좋아요 추가
                    yield client_prisma_1.default.like.create({
                        data: {
                            postId: parsedPostId,
                            userId: userId,
                        },
                        select: {
                            postId: true,
                            userId: true,
                            createdAt: true,
                        },
                    });
                    res.status(201).json({ message: "좋아요가 추가되었습니다." });
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    getLikedPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const likedPosts = yield client_prisma_1.default.like.findMany({
                    where: {
                        userId,
                    },
                    include: {
                        post: true,
                    },
                });
                res.json(likedPosts);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
const likesService = new LikesService();
exports.default = likesService;
