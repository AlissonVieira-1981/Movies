// src/pages/SeriesPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SeriesPage.css";

const SeriesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const genres = [
    "Ação", "Comédia", "Drama", "Terror", "Romance", "Ficção", "Suspense", "Gospel",
    "Documentário", "Canais Abertos", "Infantil", "Novelas", "Séries",
    "Musical", "Lançamentos", "Pod Cast",
  ];

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=1ea317e74edea61eab2f1a9e29d2efcd&language=pt-BR&page=${page}`
        );
        const data = await response.json();
        setSeries(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Erro ao buscar séries:", error);
      }
    };

    fetchSeries();
  }, [page]);

  const filteredSeries = series.filter((serie) =>
    serie.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <button key={genre} onClick={() => alert(`Buscar séries de ${genre}`)}>
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
              placeholder="Buscar séries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <h1 className="title">Nexus Series</h1>
            <button className="exit" onClick={() => navigate("/menu")}>
              Voltar
            </button>
          </div>
        </div>

        {/* Grid de séries */}
        <div className="grid">
          {filteredSeries.map((serie) => {
            const posterUrl = serie.poster_path
              ? `https://image.tmdb.org/t/p/w200${serie.poster_path}`
              : `${import.meta.env.BASE_URL}no-poster.png`;

            return (
              <div
                key={serie.id}
                className="card"
                onClick={() => navigate(`/series/${serie.id}`)}
              >
                <img src={posterUrl} alt={serie.name} />
                <h3>{serie.name}</h3>
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

export default SeriesPage;
