// src/pages/MovieDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addRecentMovie } from "../utils/Recents";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
  isFavoriteMovie,
} from "../utils/Favorites";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
  const data = await response.json();

setMovie(data);
setFavorite(isFavoriteMovie(data.id));
addRecentMovie(data);
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#000",
          color: "#39ff14",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <p>Carregando detalhes...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div
        style={{
          backgroundColor: "#000",
          color: "#39ff14",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <p>Filme não encontrado.</p>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : `${import.meta.env.BASE_URL}no-poster.png`;

  const toggleFavorite = () => {
    if (favorite) {
      removeFavoriteMovie(movie.id);
      setFavorite(false);
    } else {
      addFavoriteMovie(movie);
      setFavorite(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#39ff14",
        minHeight: "100vh",
        padding: "20px",
        position: "relative",
      }}
    >
      <button
        onClick={() => navigate("/lista")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          backgroundColor: "#000",
          border: "2px solid #39ff14",
          borderRadius: "8px",
          color: "#e0e6df",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          textShadow: "0 0 10px #e0e6df",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#111")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#000")}
      >
        ← Voltar
      </button>

      <h1
        style={{
          color: "#e0e6df",
          textShadow: "0 0 10px #e0e6df",
          marginTop: "60px",
          textAlign: "center",
        }}
      >
        {movie.title}
      </h1>

      <img
        src={posterUrl}
        alt={movie.title}
        style={{
          width: "200px",
          borderRadius: "10px",
          marginBottom: "20px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          boxShadow: "0 0 12px rgba(224, 230, 223, 0.4)",
        }}
      />

      <p>
        <strong>Sinopse:</strong>{" "}
        {movie.overview || "Sinopse não disponível."}
      </p>

      <p>
        <strong>Data de lançamento:</strong>{" "}
        {movie.release_date || "Não informada"}
      </p>

      <p>
        <strong>Nota:</strong> {movie.vote_average}
      </p>

      <button
        onClick={toggleFavorite}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          backgroundColor: favorite ? "#ff004c" : "#000",
          border: "2px solid #ff004c",
          color: "#fff",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {favorite ? "❤️ Favoritado" : "🤍 Favoritar"}
      </button>
    </div>
  );
};

export default MovieDetails;