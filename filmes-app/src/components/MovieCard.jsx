import React from "react";
import { useNavigate } from "react-router-dom";
import { addRecent } from "../services/Utils/Recents";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=Sem+Imagem";

  const handleClick = () => {
    addRecent({
      id: movie.id,
      title: movie.title,
      image: imageUrl,
    });
    navigate(`/card/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={imageUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>
      <p>{movie.release_date}</p>
    </div>
  );
};

export default MovieCard;
