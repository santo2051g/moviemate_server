import express from "express";
import { getWatchlist, addMovie, updateMovie, deleteMovie } from "../Controller/watchlistController.js";

const router = express.Router();

router.get("/", getWatchlist);
router.post("/", addMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;