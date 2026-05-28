import { useNavigate } from "react-router-dom";
import "./MenuPage.css";

function MenuPage() {
  const navigate = useNavigate();

  return (
    <div className="menu-page">
      <button className="login-return-button" onClick={() => navigate("/")}>
        Sair
      </button>

      <div className="menu-brand">
        <h1 className="menu-title">Nexus Movie</h1>
      </div>

      <div className="menu-buttons">
        <button onClick={() => navigate("/lista")} aria-label="Filmes">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
          >
            <rect x="10" y="14" width="44" height="36" rx="4" />
            <path d="M18 14v36M46 14v36" />
            <path d="M10 24h8M10 34h8" />
            <path d="M10 44h8M46 24h8" />
            <path d="M46 34h8M46 44h8" />
          </svg>
          <span>Filmes</span>
        </button>

        <button onClick={() => navigate("/series")} aria-label="Séries">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
          >
            <rect x="9" y="18" width="46" height="30" rx="5" />
            <path d="M24 18 16 8" />
            <path d="M40 18 48 8" />
            <circle cx="48" cy="28" r="2" />
            <circle cx="48" cy="36" r="2" />
            <path d="M17 26h22M17 34h18M17 42h14" />
          </svg>
          <span>Séries</span>
        </button>

        <button onClick={() => navigate("/canais")} aria-label="Canais">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
          >
            <rect x="12" y="20" width="40" height="28" rx="4" />
            <path d="M22 20 14 10" />
            <path d="M42 20 50 10" />
            <path d="M20 32h24" />
            <path d="M20 40h16" />
            <circle cx="47" cy="32" r="2" />
            <circle cx="47" cy="40" r="2" />
          </svg>
          <span>Canais</span>
        </button>

        <button onClick={() => navigate("/recentes")} aria-label="Recentes">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
          >
            <path d="M32 10a22 22 0 1 1-18 9.3" />
            <path d="M14 10v10h10" />
            <path d="M32 22v12l9 6" />
          </svg>
          <span>Recentes</span>
        </button>
      </div>
    </div>
  );
}

export default MenuPage;