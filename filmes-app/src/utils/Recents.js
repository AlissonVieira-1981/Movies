// src/utils/Recents.js

export const getRecentMovies = () => {
  return JSON.parse(localStorage.getItem("recentMovies")) || [];
};

export const addRecentMovie = (movie) => {
  const recentMovies = getRecentMovies();

  const updatedRecentMovies = [
    movie,
    ...recentMovies.filter((item) => item.id !== movie.id),
  ];

  localStorage.setItem(
    "recentMovies",
    JSON.stringify(updatedRecentMovies.slice(0, 10))
  );
};