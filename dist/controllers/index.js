"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_controller_1 = __importDefault(require("./todos.controller"));
const controllers = (0, express_1.default)();
controllers.use("/todos", todos_controller_1.default);
controllers.use("/posts", () => { });
controllers.use("/users", () => { });
controllers.use("/auth", () => { });
controllers.use("/products", () => { });
exports.default = controllers;
