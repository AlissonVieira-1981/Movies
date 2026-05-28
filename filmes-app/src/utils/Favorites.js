export const getFavoriteMovies = () => {
  return JSON.parse(localStorage.getItem("favoriteMovies")) || [];
};

export const addFavoriteMovie = (movie) => {
  const favorites = getFavoriteMovies();

  const alreadyExists = favorites.some(
    (item) => item.id === movie.id
  );

  if (alreadyExists) return;

  const updatedFavorites = [movie, ...favorites];

  localStorage.setItem(
    "favoriteMovies",
    JSON.stringify(updatedFavorites)
  );
};

export const removeFavoriteMovie = (id) => {
  const favorites = getFavoriteMovies();

  const updatedFavorites = favorites.filter(
    (movie) => movie.id !== id
  );

  localStorage.setItem(
    "favoriteMovies",
    JSON.stringify(updatedFavorites)
  );
};

export const isFavoriteMovie = (id) => {
  const favorites = getFavoriteMovies();

  return favorites.some((movie) => movie.id === id);
};