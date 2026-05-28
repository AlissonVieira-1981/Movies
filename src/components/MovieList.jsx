import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MovieList.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieList() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const genres = [
    "Ação",
    "Comédia",
    "Drama",
    "Terror",
    "Romance",
    "Ficção",
    "Suspense",
    "Gospel",
    "Documentário",
    "Canais Abertos",
    "Infantil",
    "Novelas",
    "Séries",
    "Musical",
    "Lançamentos",
    "Pod Cast",
  ];

  useEffect(() => {
    fetchMovies();
  }, [page]);

  async function fetchMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`
      );

      const data = await response.json();

      setMovies(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list">

      {/* SIDEBAR */}
      <div className="sidebar-movie-list">

        <h2 className="sidebar-title">
          WELCOME
        </h2>

        <div className="tv-icon">
          📺
        </div>

        <div className="genre-buttons">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => alert(`Buscar filmes de ${genre}`)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="main">

        {/* TOP BAR */}
        <div className="top-bar-container">

          <div className="top-bar">

            <input
              type="text"
              placeholder="Buscar filmes..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

           <h1 className="page-title">Nexus Movie</h1>

            <button
              className="exit"
              onClick={() => navigate("/menu")}
            >
              Voltar
            </button>

          </div>
        </div>

        {/* GRID */}
        <div className="grid">

          {filteredMovies.map((movie) => {
            const posterUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : `${import.meta.env.BASE_URL}no-poster.png`;

            return (
              <div
                key={movie.id}
                className="card"
                onClick={() =>
                  navigate(`/card/${movie.id}`)
                }
              >
                <img
                  src={posterUrl}
                  alt={movie.title}
                />

                <h3>{movie.title}</h3>
              </div>
            );
          })}
        </div>

        {/* PAGINAÇÃO */}
        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
            className="pagination-btn"
          >
            ← Anterior
          </button>

          <span className="pagination-info">
            Página {page}
          </span>

          <button
            onClick={() =>
              setPage(page + 1)
            }
            className="pagination-btn"
          >
            Próxima →
          </button>

        </div>
      </div>
    </div>
  );
}

export default MovieList;