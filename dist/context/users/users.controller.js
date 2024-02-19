"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_service_1 = __importDefault(require("./users.service"));
const usersController = (0, express_1.Router)();
usersController.post("/", users_service_1.default.createUser);
usersController.get("/", users_service_1.default.getUsers);
usersController.get("/:userId", users_service_1.default.getUser);
usersController.put("/:userId", users_service_1.default.updateUser);
usersController.delete("/:userId", users_service_1.default.deleteUser);
exports.default = usersController;
