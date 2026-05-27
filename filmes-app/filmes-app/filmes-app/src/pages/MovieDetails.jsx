// src/pages/MovieDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=1ea317e74edea61eab2f1a9e29d2efcd&language=pt-BR`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p style={{ color: "#39ff14" }}>Carregando detalhes...</p>;

  // Se não houver poster, usa imagem padrão do public
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : `${import.meta.env.BASE_URL}no-poster.png`;

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
      {/* Botão fixo no canto superior esquerdo */}
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
        onMouseOver={(e) => (e.target.style.backgroundColor = "#111")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
      >
        ← Voltar
      </button>

      {/* Título */}
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

      {/* Poster */}
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

      {/* Informações */}
      <p>
        <strong>Sinopse:</strong> {movie.overview}
      </p>
      <p>
        <strong>Data de lançamento:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Nota:</strong> {movie.vote_average}
      </p>
    </div>
  );
};

export default MovieDetails;
