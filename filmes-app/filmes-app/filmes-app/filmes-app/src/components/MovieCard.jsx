import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=Sem+Imagem";

  return (
    <Link to={`/card/${movie.id}`} style={{ textDecoration: "none" }}>
      <div className="movie-card">
        <img src={imageUrl} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>⭐ {movie.vote_average}</p>
        <p>{movie.release_date}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
