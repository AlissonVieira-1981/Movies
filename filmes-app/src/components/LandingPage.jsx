import { useNavigate } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="Logo do App"
        className="landing-logo"
      />

      <h1 className="page-title">Nexus Movie</h1>

      <p className="landing-text">
        Bem-vindo ao seu portal de filmes, séries e canais abertos.
      </p>

      <form className="landing-form">
        <input type="text" placeholder="Usuário" className="landing-input" />
        <input type="password" placeholder="Senha" className="landing-input" />
        <button
          type="button"
          onClick={() => navigate("/menu")}
          className="landing-button"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
