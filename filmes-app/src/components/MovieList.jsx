// src/components/MovieList.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./MovieList.css";

const MovieList = ({ movies }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const genres = [
    "Ação","Comédia","Drama","Terror","Romance","Ficção","Suspense","Gospel",
    "Documentário","Canais Abertos","Infantil","Novelas","Séries",
    "Musical","Lançamentos","Pod Cast",
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list">
      {/* Sidebar */}
      <div className="sidebar-movie-list">
        <h2 className="sidebar-title">WELCOME</h2>

        {/* Ícone da TV — visível apenas em PC */}
        <div className="tv-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
            fill="none" stroke="#3bd81f" strokeWidth="2.5">
            <rect x="8" y="16" width="48" height="32" rx="4" ry="4" />
            <rect x="12" y="20" width="40" height="24" rx="2" ry="2" fill="black" />
            <line x1="20" y1="16" x2="12" y2="4" />
            <line x1="44" y1="16" x2="52" y2="4" />
            <circle cx="54" cy="28" r="2" />
            <circle cx="54" cy="34" r="2" />
            <circle cx="54" cy="40" r="2" />
          </svg>
        </div>

        {/* Botões de gênero */}
        <div className="genre-buttons">
          {genres.map((genre) => (
            <button key={genre} onClick={() => alert(`Buscar filmes de ${genre}`)}>
              {genre}
            </button>
          ))}
        </div>
      </div>

     {/* Área principal */}
<div className="main">
  <div className="top-bar-container">
    <div className="top-bar">
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h1 className="title">Nexus Movie</h1>
      <button className="exit" onClick={() => navigate("/")}>Sair</button>
    </div>
  </div>

  <div className="grid">
    {filteredMovies.map((movie) => {
      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : `${import.meta.env.BASE_URL}no-poster.png`;

      return (
        <div
          key={movie.id}
          className="card"
          onClick={() => navigate(`/card/${movie.id}`)}
        >
          <img src={posterUrl} alt={movie.title} />
          <h3>{movie.title}</h3>
        </div>
      );
    })}
  </div>
</div>

    </div>
  );
};

export default MovieList;
