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
const bcrypt_1 = require("bcrypt");
const client_prisma_1 = __importDefault(require("../../prisma/client.prisma"));
class UsersService {
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, nickname, name, gender, age } = req.body;
                if (!email.trim())
                    throw new Error("No email");
                if (!password.trim())
                    throw new Error("No password");
                const encryptedPassword = yield (0, bcrypt_1.hash)(password, 12);
                const user = yield client_prisma_1.default.user.create({
                    data: {
                        email,
                        encryptedPassword,
                        profile: { create: { nickname, name, gender, age } },
                    },
                    select: { id: true, email: true, createdAt: true, profile: true },
                });
                res.json(user);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getUsers(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield client_prisma_1.default.user.findMany();
            res.json(users);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedUserId = Number(req.params.userId);
            if (isNaN(parsedUserId))
                throw new Error("UserId is not a number");
            const user = yield client_prisma_1.default.user.findUnique({
                where: { id: parsedUserId },
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                    profile: true,
                },
            });
            res.json(user);
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedUserId = Number(req.params.userId);
            if (isNaN(parsedUserId))
                throw new Error("UserId is not a number");
            const { email } = req.body;
            const user = yield client_prisma_1.default.user.update({
                where: { id: parsedUserId },
                data: { email },
                select: { id: true, email: true, createdAt: true },
            });
            if (!user)
                throw new Error("User Not Found");
            res.json(user);
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedUserId = Number(req.params.userId);
                if (isNaN(parsedUserId))
                    throw new Error("UserId is not a number");
                yield client_prisma_1.default.user.delete({ where: { id: parsedUserId } });
                res.json(parsedUserId);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
const usersService = new UsersService();
exports.default = usersService;
