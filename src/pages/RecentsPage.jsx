import { useNavigate } from "react-router-dom";
import { getRecentMovies } from "../utils/Recents";
import "./RecentsPage.css";

function RecentsPage() {
  const navigate = useNavigate();
  const recentMovies = getRecentMovies();

  return (
    <div className="recents-page">
      <button
        type="button"
        className="recents-back-button"
        onClick={() => navigate("/menu")}
      >
        Voltar
      </button>

      <h1 className="recents-title">Filmes Recentes</h1>

      {recentMovies.length === 0 ? (
        <p className="recents-empty">Nenhum filme recente por enquanto.</p>
      ) : (
        <div className="recents-grid">
          {recentMovies.map((movie) => {
            const posterUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : `${import.meta.env.BASE_URL}no-poster.png`;

            return (
              <button
                key={movie.id}
                type="button"
                className="recents-card"
                onClick={() => navigate(`/card/${movie.id}`)}
              >
                <img src={posterUrl} alt={movie.title} />
                <h2>{movie.title}</h2>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecentsPage;