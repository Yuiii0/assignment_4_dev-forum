"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const authController = (0, express_1.Router)();
authController.post("/sign-up", auth_service_1.default.signUp);
authController.post("/log-in", auth_service_1.default.logIn);
exports.default = authController;
