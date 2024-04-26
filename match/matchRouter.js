import {
  createMatch,
  getMatches,
  getMatchById,
  deleteMatchById,
  updateMatch,
} from "./matchController.js";
import express from "express";

const matchRouter = express.Router();

matchRouter.post("/create-match", createMatch);
matchRouter.get("/all-matches", getMatches);
matchRouter.get("/:id", getMatchById);
matchRouter.put("/match/:id", updateMatch);
matchRouter.delete("/delete-match/:id", deleteMatchById);

export default matchRouter;
