import { useState } from "react";
import "../css/Favorites.css";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useFavorites();
  const [sortOption, setSortOption] = useState("");

  const sortMovies = (favorites, option) => {
    if (option === "title") {
      return [...favorites].sort((a, b) => a.Title.localeCompare(b.Title));
    }
    if (option === "year") {
      return [...favorites].sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    }
    return favorites;
  };

  const sortedMovies = sortMovies(favorites, sortOption);

  return (
    <div>
      {favorites.length > 0 ? (
        <div className="favorites">
          <h2>Your Favorites</h2>
          <div className="sort-container">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
            >
              <option value="">Sort by</option>
              <option value="title">Title</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="movies-grid">
            {favorites &&
              sortedMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))}
          </div>
        </div>
      ) : (
        <div className="favorites-empty">
          <h2>No Favorites Yet</h2>
          <p>Start adding movies to your favorites and they will appear here</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
