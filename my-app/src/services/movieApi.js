const API_KEY = '1662b30a';
const API_KEY_TRENDING = 'f0b0b2303007a87e9939a71289ae05a6';
const IMDb_URL = 'http://www.omdbapi.com/';
const TMDB_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query) => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`${IMDb_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    const data = await response.json();
    
    if (data.Response === 'True') {
      return data.Search || [];
    }
    return [];
  } catch (error) {
    console.error('Ошибка поиска фильмов:', error);
    return [];
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`${IMDb_URL}?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка получения деталей фильма:', error);
    return null;
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(`${TMDB_URL}/trending/movie/week?api_key=${API_KEY_TRENDING}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Ошибка получения трендовых фильмов:', error);
    return null;
  }
 
};

 
