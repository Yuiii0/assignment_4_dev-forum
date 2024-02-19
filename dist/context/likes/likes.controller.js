"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likes_service_1 = __importDefault(require("./likes.service"));
const likesController = (0, express_1.Router)();
likesController.get("/", likes_service_1.default.getLikedPosts);
likesController.post("/:postId", likes_service_1.default.toggleLike);
exports.default = likesController;
