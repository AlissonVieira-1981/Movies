import { HashRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "../pages/MovieDetails";
import LandingPage from "../components/LandingPage";
import MenuPage from "../pages/MenuPage";
import MovieList from "../components/MovieList";
import RecentsPage from "../pages/RecentsPage";
import SeriesPage from "../pages/SeriesPage";
import SeriesDetails from "../pages/SeriesDetails";
import Canais from "../pages/Canais";

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/menu" element={<MenuPage />} />

        <Route path="/lista" element={<MovieList />} />

        <Route path="/recentes" element={<RecentsPage />} />

        <Route path="/series" element={<SeriesPage />} />

        <Route path="/series/:id" element={<SeriesDetails />} />

        <Route path="/canais" element={<Canais />} />

        <Route path="/card/:id" element={<MovieDetails />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;