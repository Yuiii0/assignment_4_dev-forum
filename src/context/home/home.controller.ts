import { Router } from "express";
import homeService from "./home.service";

const homeController = Router();

homeController.get("/", homeService.getLatestPosts);

export default homeController;
