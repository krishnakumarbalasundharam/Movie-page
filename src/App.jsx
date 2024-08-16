import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import Footer from "./Footer.jsx"
import "./App.css";

const API_URL = `https://www.omdbapi.com?apikey=${import.meta.env.VITE_OMDB_API_KEY}`;


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("captain america");
  }, []);
  console.log(import.meta.env.VITE_OMDB_API_KEY);

  const handleKeyPress =(event)=>{
if(event.key === 'Enter'){
  searchMovies(searchTerm);
}
  }

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  
  return (
    <div className="app">
      <h1>FilmioPobia</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
         onKeyDown={handleKeyPress}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    <div>
      <Footer/>
    </div>
    </div>
  );
};

export default App;
