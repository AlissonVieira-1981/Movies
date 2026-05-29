export const authorizedMovies = [
  {
    tmdbId: "ErMHj6sCUyg",
    title: "Par Perfeito",
    provider: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=ErMHj6sCUyg",
    license: "Embed oficial/autorizado pelo canal responsável.",
  },
];

export function getAuthorizedMovieByTmdbId(tmdbId) {
  return authorizedMovies.find((movie) => movie.tmdbId === Number(tmdbId));
}

export function getYoutubeEmbedUrl(url) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
  const videoId = match?.[1];

  if (!videoId) return url;

  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1`;
}