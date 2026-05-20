// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import MenuPage from "./pages/MenuPage";
import MovieList from "./components/MovieList";
import MovieDetails from "./pages/MovieDetails";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=1ea317e74edea61eab2f1a9e29d2efcd&language=pt-BR&page=1"
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    // 👇 Adicionamos o basename para funcionar no GitHub Pages
<Router basename="/Movies">
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/menu" element={<MenuPage />} />
    <Route path="/lista" element={<MovieList movies={movies} />} />
    <Route path="/card/:id" element={<MovieDetails />} />
  </Routes>
</Router>

  );
}

export default App;
