// src/components/MovieList.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MovieList.css";

const MovieList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const genres = [
    "Ação", "Comédia", "Drama", "Terror", "Romance", "Ficção", "Suspense", "Gospel",
    "Documentário", "Canais Abertos", "Infantil", "Novelas", "Séries",
    "Musical", "Lançamentos", "Pod Cast",
  ];

  // Busca filmes da API sempre que a página mudar
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=1ea317e74edea61eab2f1a9e29d2efcd&language=pt-BR&page=${page}`
        );
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, [page]);

  // Filtro de busca local
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list">
      {/* Sidebar */}
      <div className="sidebar-movie-list">
        <h2 className="sidebar-title">WELCOME</h2>

        {/* Ícone da TV */}
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
            <button className="exit" onClick={() => navigate("/menu")}>
              Voltar
            </button>
          </div>
        </div>

        {/* Grid de filmes */}
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

        {/* Paginação */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="pagination-btn"
          >
            ← Anterior
          </button>
          <span className="pagination-info">
            Página {page} de {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="pagination-btn"
          >
            Próxima →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
