import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=a8b334dcf0bb3f8f04929d2a516f23d5"
      )
      .then((res) => setMovies(res.data.results))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=a8b334dcf0bb3f8f04929d2a516f23d5&query=${searchTerm}`
      )
      .then((res) => setSearchResults(res.data.results))
      .catch((err) => setError(err.message));
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      {searchResults.length > 0 ? (
        <div className="movies-grid">
          {searchResults.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Poster for ${movie.title}`}
              />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>Rating: {movie.vote_average}/10</p>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Poster for ${movie.title}`}
              />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>Rating: {movie.vote_average}/10</p>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
