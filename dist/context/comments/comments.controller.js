"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_service_1 = __importDefault(require("./comments.service"));
const commentsController = (0, express_1.Router)();
commentsController.post("/", comments_service_1.default.createComment);
commentsController.get("/", comments_service_1.default.getCommentsByPostId);
commentsController.get("/all", comments_service_1.default.getAllComments);
commentsController.get("/:commentId", comments_service_1.default.getComment);
commentsController.put("/:commentId", comments_service_1.default.updateComment);
commentsController.delete("/:commentId", comments_service_1.default.deleteComment);
exports.default = commentsController;
