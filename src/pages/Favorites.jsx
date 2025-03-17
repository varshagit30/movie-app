import "../css/Favorites.css";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      {favorites.length > 0 ? (
        <div className="favorites">
          <h2>Your Favorites</h2>
          <div className="movies-grid">
            {favorites.map((movie) => (
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
