// src/components/LandingPage.jsx
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative", // 👈 permite posicionar elementos livremente
        backgroundColor: "#000",
        color: "#39ff14",
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="Logo do App"
        style={{
          position: "absolute",
          top: "80%", // 👈 centraliza verticalmente
          left: "50%", // 👈 centraliza horizontalmente
          transform: "translate(-50%, -120%)", // 👈 ajusta posição acima do centro
          width: "clamp(260px, 40vw, 420px)",
          filter: "drop-shadow(0 0 25px #39ff14)",
        }}
      />

      {/* Título */}
      <h1
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -40%)", // 👈 logo abaixo do logo
          fontSize: "clamp(48px, 10vw, 10px)",
          fontWeight: "bold",
          textShadow:
            "0 0 10px #e0e6df, 0 0 20px #39ff14, 0 0 40px #e0e6df, 0 0 80px #39ff14",
          margin: 0,
        }}
      >
        Nexus Movie
      </h1>

      {/* Texto de boas-vindas */}
      <p
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(16px, 3vw, 22px)",
          color: "#e0e6df",
          textShadow: "0 0 8px #39ff14",
          maxWidth: "600px",
          margin: 0,
        }}
      >
        Bem-vindo ao seu portal de filmes, séries e canais abertos.
      </p>

      {/* Campos de login */}
      <div
        style={{
          position: "absolute",
          top: "72%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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

      {/* Responsividade */}
      <style>
        {`
          @media (max-width: 768px) {
            img {
              transform: translate(-50%, -130%) !important;
              width: 320px !important;
            }

            h1 {
              transform: translate(-50%, -50%) !important;
              font-size: 72px !important;
            }

            p {
              top: 62% !important;
              font-size: 18px !important;
            }

            div {
              top: 78% !important;
              gap: 8px !important;
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
