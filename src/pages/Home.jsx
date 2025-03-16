import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "a987a54e";
  const BASE_URL = "https://www.omdbapi.com/";

  const getPopularMovies = async (searchValue) => {
    if (!searchValue) return;
    setLoading(true);
    // const url = `${BASE_URL}?s=${searchValue}&apikey=${API_KEY}`;
    // // const response = await fetch(
    // //   `${BASE_URL}&api_key=${API_KEY}`
    // // );
    // const response = await fetch(url);
    // const data = await response.json();
    // console.log("data", data);
    // if (data.Search) {
    //   setMovies(data.Search);
    // }

    try {
      const url = `${BASE_URL}?s=${searchValue}&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to load movies...");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // const getPopularMovies = async (searchValue) => {
  //   if (!searchValue) return; // Prevent empty searches
  //   setLoading(true);

  //   try {
  //     const url = `${BASE_URL}?s=${searchValue}&apikey=${API_KEY}`;
  //     const response = await fetch(url);
  //     const data = await response.json();

  //     if (data.Response === "True") {
  //       setMovies(data.Search); // Array of movie objects
  //     } else {
  //       setError(data.Error); // Handle error (e.g., no results found)
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setError("Failed to load movies...");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (searchValue) {
      getPopularMovies(searchValue);
    } else {
      getPopularMovies("Action");
    }
  }, [searchValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    setError(!error);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchValue}
          onChange={handleSearch}
        />
        {/* <button type="submit" className="search-button">
          Search
        </button> */}
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
