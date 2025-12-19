import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  notes: String // optional field for description/genre/etc.
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
export default Watchlist;