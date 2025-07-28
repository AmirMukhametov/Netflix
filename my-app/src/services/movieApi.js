const API_KEY = '1662b30a';
const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (query) => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
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
    const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка получения деталей фильма:', error);
    return null;
  }
}; 