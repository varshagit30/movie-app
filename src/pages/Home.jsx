import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const API_KEY = "a987a54e";
  const BASE_URL = "https://www.omdbapi.com/";

  const getPopularMovies = async (searchValue) => {
    if (!searchValue) return;
    setLoading(true);

    try {
      const url = `${BASE_URL}?s=${searchValue}&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError("Movie not found!");
      }
    } catch (err) {
      setError("Failed to load movies...");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchValue) {
      getPopularMovies(debouncedSearchValue);
    } else {
      getPopularMovies("Action");
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    setError(null);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchValue}
          onChange={handleSearch}
        />
      </form>
      {error && <p>{error}</p>}
      {/* {loading && <p>Loading...</p>} */}
      <div className="movies-grid">
        {movies &&
          movies.map((movie) => (
            <>
              <MovieCard movie={movie} key={movie.imdbID} />
            </>
          ))}
      </div>
    </div>
  );
};

export default Home;
