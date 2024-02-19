"use strict";
//요청 처리 & 뷰에게 전달
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_view_1 = __importDefault(require("../views/todos.view"));
const todosController = (0, express_1.Router)();
todosController.get("/", todos_view_1.default.getTodos);
todosController.get("/:todoId", todos_view_1.default.getTodo);
exports.default = todosController;
