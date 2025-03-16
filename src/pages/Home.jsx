import { useState } from "react";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const movies = [
    { id: 1, title: "john Wick", releaseDate: "2020" },
    { id: 2, title: "The Matrix", releaseDate: "1998" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue.toLowerCase())
  );

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
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <>
            <MovieCard movie={movie} key={movie.id} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
