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
const client_db_1 = __importDefault(require("../../db/client.db"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client_db_1.default.query("SELECT * FROM posts");
        const posts = result.rows;
        res.json(posts);
    }
    catch (e) {
        throw e;
    }
});
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId; //뒤에오는 value중에 첫번재값
        const result = yield client_db_1.default.query("SELECT * FROM posts WHERE id=$1", [
            postId,
        ]);
        const posts = result.rows[0];
        res.json(posts);
    }
    catch (e) {
        throw e;
    }
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId; //뒤에오는 value중에 첫번재값
        const { title, content } = req.body;
        const result = yield client_db_1.default.query("UPDATE posts SET title=$1, content=$2 WHERE id=$3 RETUNING *", [title, content, postId]);
        const updatedPost = result.rows[0];
        res.json(updatedPost);
    }
    catch (e) {
        throw e;
    }
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const result = yield client_db_1.default.query("INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *", [title, content]);
        const newPost = result.rows[0];
        res.json(newPost);
    }
    catch (e) {
        throw e;
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId; //뒤에오는 value중에 첫번재값
        const result = yield client_db_1.default.query("DELETE FROM posts WHERE id=$1", [
            postId,
        ]);
        res.json(postId);
    }
    catch (e) {
        throw e;
    }
});
const postsService = {
    getPosts,
    getPost,
    updatePost,
    createPost,
    deletePost,
};
exports.default = postsService;
