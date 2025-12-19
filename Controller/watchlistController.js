import Watchlist from "../Model/watchlist.js";


export const getWatchlist = async (req, res) => {
  try {
    const movies = await Watchlist.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const addMovie = async (req, res) => {
  try {
    const movie = new Watchlist(req.body);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Watchlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteMovie = async (req, res) => {
  try {
    await Watchlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};