import axios from "axios";

// =============================
// CONFIG API
// =============================

const API_KEY = "1ea317e74edea61eab2f1a9e29d2efcd";

const BASE_URL = "https://api.themoviedb.org/3";

// =============================
// AXIOS
// =============================

const api = axios.create({
  baseURL: BASE_URL,

  params: {
    api_key: API_KEY,
    language: "pt-BR",
  },
});

// =============================
// FILMES POPULARES
// =============================

export const fetchPopularMovies = async () => {
  try {
    const response = await api.get(
      "/movie/popular",
      {
        params: {
          page: 1,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    console.error(
      "Erro ao buscar filmes:",
      error
    );

    return [];
  }
};

// =============================
// DETALHES DO FILME
// =============================

export const fetchMovieDetails = async (
  id
) => {
  try {
    const response = await api.get(
      `/movie/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar detalhes do filme:",
      error
    );

    return null;
  }
};

// =============================
// SÉRIES POPULARES
// =============================

export const fetchPopularSeries =
  async () => {
    try {
      const response = await api.get(
        "/tv/popular",
        {
          params: {
            page: 1,
          },
        }
      );

      return response.data.results;
    } catch (error) {
      console.error(
        "Erro ao buscar séries:",
        error
      );

      return [];
    }
  };

// =============================
// DETALHES DA SÉRIE
// =============================

export const fetchSeriesDetails =
  async (id) => {
    try {
      const response = await api.get(
        `/tv/${id}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Erro ao buscar detalhes da série:",
        error
      );

      return null;
    }
  };

// =============================
// EXPORT DEFAULT
// =============================

export default api;