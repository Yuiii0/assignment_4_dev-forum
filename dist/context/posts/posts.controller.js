"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_service_1 = __importDefault(require("./posts.service"));
const postsController = (0, express_1.Router)();
postsController.post("/", posts_service_1.default.createPost);
postsController.get("/", posts_service_1.default.getPosts);
postsController.get("/:postId", posts_service_1.default.getPost);
postsController.put("/:postId", posts_service_1.default.updatePost);
postsController.delete("/:postId", posts_service_1.default.deletePost);
exports.default = postsController;
