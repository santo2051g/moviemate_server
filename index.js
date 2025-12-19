import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";   // ✅ add mongoose
import watchlistRoutes from "./Routes/watchlistroutes.js";
import authRoutes from "./Routes/authroutes.js";


dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err.message));

// Mount watchlist routes
app.use("/api/watchlist", watchlistRoutes);

// Combined route: trending movies + genres
app.get("/api/movies/trending-with-genres", async (req, res) => {
  try {
    const [trendingRes, genresRes] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      ),
      axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
      )
    ]);

    const genreMap = {};
    genresRes.data.genres.forEach((g) => {
      genreMap[g.id] = g.name;
    });

    const movies = trendingRes.data.results.map((m) => ({
      ...m,
      genres: m.genre_ids.map((id) => genreMap[id])
    }));

    res.json(movies);
  } catch (err) {
    console.error("TMDB error:", err.response?.data || err.message);
    res.status(500).json({ message: err.message });
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));