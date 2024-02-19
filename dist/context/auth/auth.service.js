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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const client_prisma_1 = __importDefault(require("../../prisma/client.prisma"));
class AuthService {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name, gender, age } = req.body;
                // if (!email.trim()) throw new Error("No email");
                // if (!password.trim()) throw new Error("No password");
                const encryptedPassword = yield bcrypt_1.default.hash(password, 12);
                const user = yield client_prisma_1.default.user.create({
                    data: {
                        email,
                        encryptedPassword,
                        profile: { create: { name, gender, age } },
                    },
                    select: { id: true, email: true, encryptedPassword: true },
                });
                res.json(user);
            }
            catch (e) {
                next(e);
            }
        });
    }
    logIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                //email로 사용자 찾기
                const user = yield client_prisma_1.default.user.findUnique({
                    where: { email },
                });
                //사용자 존재x
                if (!user) {
                    return res
                        .status(404)
                        .json({ message: "유효하지 않은 이메일 또는 비밀번호 입니다." });
                }
                const isVerified = yield bcrypt_1.default.compare(password, user.encryptedPassword);
                //비밀번호 불일치
                if (!isVerified)
                    return res
                        .status(400)
                        .json({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
                //JWT 토큰 생성
                const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.JWT_SECRET_KEY, {
                    subject: user.id.toString(),
                });
                res.json(accessToken);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
const authService = new AuthService();
exports.default = authService;
