// src/pages/SeriesDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const SeriesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serie, setSerie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchSerie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=api_key=${API_KEY}&language=pt-BR`
        );
        const data = await response.json();
        setSerie(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da série:", error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=1ea317e74edea61eab2f1a9e29d2efcd&language=pt-BR`
        );
        const data = await response.json();
        const video = data.results.find((v) => v.site === "YouTube");
        if (video) setTrailerKey(video.key);
      } catch (error) {
        console.error("Erro ao buscar trailer:", error);
      }
    };

    fetchSerie();
    fetchTrailer();
  }, [id]);

  if (!serie) {
    return <p style={{ color: "#39ff14" }}>Carregando detalhes...</p>;
  }

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#39ff14",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Título no topo */}
      <h1
        style={{
          fontSize: "clamp(28px, 5vw, 72px)",
          textShadow: "0 0 20px #39ff14, 0 0 40px #39ff14",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {serie.name}
      </h1>

      {/* Player logo abaixo do título */}
      {trailerKey ? (
        <div style={{ marginBottom: "30px", width: "100%", maxWidth: "900px" }}>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer da Série"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "2px solid #39ff14",
                borderRadius: "12px",
                boxShadow: "0 0 20px #39ff14",
              }}
            ></iframe>
          </div>
        </div>
      ) : (
        <p style={{ marginBottom: "30px" }}>
          Trailer não disponível para esta série.
        </p>
      )}

      {/* Sinopse */}
      <p style={{ maxWidth: "800px", lineHeight: "1.6", textAlign: "center" }}>
        {serie.overview || "Descrição não disponível."}
      </p>

      {/* Botão Voltar */}
      <button
        onClick={() => navigate("/series")}
        style={{
          marginTop: "40px",
          backgroundColor: "#000",
          color: "#39ff14",
          border: "2px solid #39ff14",
          borderRadius: "8px",
          padding: "10px 20px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 0 10px #39ff14",
          width: "90%",
          maxWidth: "300px",
        }}
      >
        Voltar para Séries
      </button>
    </div>
  );
};

export default SeriesDetails;
