"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_service_1 = __importDefault(require("./home.service"));
const homeController = (0, express_1.Router)();
homeController.get("/", home_service_1.default.getLatestPosts);
exports.default = homeController;
