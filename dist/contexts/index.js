"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const express_1 = require("express");
const posts_controller_1 = __importDefault(require("./posts.context/posts.controller"));
exports.controllers = (0, express_1.Router)();
exports.controllers.use("/posts", posts_controller_1.default);
