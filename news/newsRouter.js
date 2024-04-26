import { getAllNews, getNewsById, deleteNewsById } from "./newsController.js";
import express from "express";

const newsRouter = express.Router();

newsRouter.get("/all/news", getAllNews);
newsRouter.get("/news/:id", getNewsById);
newsRouter.delete("/delete-news/:id", deleteNewsById);

export default newsRouter;
