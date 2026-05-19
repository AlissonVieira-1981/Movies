// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#39ff14",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      {/* Logo grande */}
      <img
        src="/logo.png"
        alt="Logo do App"
        style={{
          width: "clamp(220px, 35vw, 380px)",
          height: "auto",
          filter: "drop-shadow(0 0 20px #39ff14)",
          marginBottom: "20px",
        }}
      />

      {/* Título chamativo */}
      <h1
        style={{
          fontSize: "clamp(48px, 10vw, 100px)",
          fontWeight: "bold",
          textShadow:
            "0 0 10px #e0e6df, 0 0 20px #39ff14, 0 0 40px #e0e6df, 0 0 80px #39ff14",
          marginBottom: "80px",
        }}
      >
        Nexus Movie
      </h1>

      {/* Texto de boas-vindas */}
      <p
        style={{
          fontSize: "clamp(16px, 3vw, 22px)",
          color: "#e0e6df",
          textShadow: "0 0 8px #39ff14",
          marginBottom: "40px",
          maxWidth: "600px",
        }}
      >
        Bem-vindo ao seu portal de filmes, séries e canais abertos.
      </p>

      {/* Campos de login */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          placeholder="Usuário"
          style={{
            flex: 1,
            minWidth: "140px",
            height: "36px",
            border: "2px solid #39ff14",
            borderRadius: "12px",
            backgroundColor: "#111",
            boxShadow: "0 0 15px rgba(57, 255, 20, 0.4)",
            color: "#e0e6df",
            fontSize: "14px",
            paddingLeft: "10px",
            outline: "none",
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          style={{
            flex: 1,
            minWidth: "140px",
            height: "36px",
            border: "2px solid #39ff14",
            borderRadius: "12px",
            backgroundColor: "#111",
            boxShadow: "0 0 15px rgba(57, 255, 20, 0.4)",
            color: "#e0e6df",
            fontSize: "14px",
            paddingLeft: "10px",
            outline: "none",
          }}
        />
        <button
          onClick={() => navigate("/menu")}
          style={{
            height: "36px",
            border: "2px solid #39ff14",
            borderRadius: "12px",
            backgroundColor: "#111",
            color: "#e0e6df",
            cursor: "pointer",
            fontWeight: "bold",
            padding: "0 20px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#222")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#111")}
        >
          Entrar
        </button>
      </div>

      {/* Animação neon + responsividade */}
      <style>
        {`
          @keyframes pulse {
            0% { text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14; }
            50% { text-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14; }
            100% { text-shadow: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14; }
          }

          /* Responsividade — tudo centralizado */
          @media (max-width: 768px) {
            body, html {
              overflow-x: hidden;
              overflow-y: auto;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            div {
              justify-content: center !important;
              align-items: center !important;
              text-align: center !important;
            }

            img {
              width: 320px !important; /* 👈 rolo de filme maior */
              margin-bottom: 25px !important;
            }

            h1 {
              font-size: 72px !important;
              margin-bottom: 25px !important;
            }

            p {
              font-size: 18px !important;
              margin-bottom: 35px !important;
            }

            input, button {
              width: 90% !important;
              max-width: 300px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
