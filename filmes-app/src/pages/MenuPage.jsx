// src/pages/MenuPage.jsx
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    width: "220px",
    height: "220px",
    backgroundColor: "#000",
    color: "#39ff14",
    border: "2px solid #39ff14",
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: "22px",
    cursor: "pointer",
    transition: "0.3s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    overflow: "hidden",
    aspectRatio: "1 / 1",
  };

  const neonText = {
    textShadow:
      "0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14",
    animation: "pulse 2s infinite",
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        backgroundImage: "url('/Movies/images/futuristic-texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#39ff14",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        textAlign: "center",
        padding: "2px",
        position: "relative",
      }}
    >
      {/* Logo */}
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="Logo do App"
        style={{
          width: "clamp(180px, 25vw, 300px)",
          height: "auto",
          filter: "drop-shadow(0 0 12px #39ff14)",
          
        }}
      />

      {/* Título */}
      <h1
        style={{
          fontSize: "clamp(48px, 8vw, 94px)",
          fontWeight: "bold",
          textShadow:
            "0 0 50px #e0e6df, 0 0 20px #39ff14, 0 0 80px #e0e6df, 0 0 80px #39ff14",
          marginBottom: "50px",
        }}
      >
        Nexus Movie
      </h1>

      {/* Animação neon */}
      <style>
        {`
          @keyframes pulse {
            0% { text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14; }
            50% { text-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14; }
            100% { text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14; }
          }
          @media (max-width: 768px) {
            button {
              width: 140px !important;
              height: 140px !important;
              font-size: 16px !important;
            }
            img {
              max-width: 90px !important;
            }
          }
        `}
      </style>

      {/* Botões */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {/* Botão Filmes */}
        <button
          onClick={() => navigate("/lista")}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#111")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
        >
          <img
            src={`${import.meta.env.BASE_URL}pelicula-icon.png`}
            alt="Ícone de Película"
            style={{
              width: "100px",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 0 8px #39ff14)",
              marginBottom: "10px",
            }}
          />
          <span style={neonText}>Filmes</span>
        </button>

        {/* Botão Séries */}
        <button
          onClick={() => alert("Página de séries em construção!")}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#111")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
        >
          <img
            src={`${import.meta.env.BASE_URL}pelicula-icon.png`}
            alt="Ícone de Película"
            style={{
              width: "100px",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 0 8px #39ff14)",
              marginBottom: "10px",
            }}
          />
          <span style={neonText}>Séries</span>
        </button>

        {/* Botão Canais */}
        <button
          onClick={() => navigate("/canais")}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#111")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            style={{ filter: "drop-shadow(0 0 8px #39ff14)" }}
          >
            <rect
              x="10"
              y="15"
              width="80"
              height="55"
              stroke="#39ff14"
              strokeWidth="3"
              fill="none"
              rx="6"
            />
            <line
              x1="25"
              y1="75"
              x2="75"
              y2="75"
              stroke="#39ff14"
              strokeWidth="3"
            />
            <line
              x1="50"
              y1="75"
              x2="50"
              y2="90"
              stroke="#39ff14"
              strokeWidth="3"
            />
          </svg>
          <span style={neonText}>Canais</span>
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
