import axios from "axios";

const API_KEY = "1ea317e74edea61eab2f1a9e29d2efcd"; // substitua pela sua chave
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`,
    );
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`,
    );
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
};
