const API_KEY_IMDb = '1662b30a';
const API_KEY_TMDb = 'f0b0b2303007a87e9939a71289ae05a6';
const IMDb_URL = 'http://www.omdbapi.com/';
const TMDb_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query) => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`${IMDb_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY_IMDb}`);
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
    const response = await fetch(`${IMDb_URL}?i=${imdbID}&apikey=${API_KEY_IMDb}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка получения деталей фильма:', error);
    return null;
  }
};

export const getTMDbMovieDetails = async (movieId) => {
  console.log('Fetching TMDb movie details for ID:', movieId);
  try {
    const response = await fetch(
      `${TMDb_URL}/movie/${movieId}?api_key=${API_KEY_TMDb}&append_to_response=credits,videos,images&language=ru-RU`
    );
    
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    
    const data = await response.json();
    console.log('TMDb movie details received:', data);
    
    // Извлекаем режиссера из credits
    const director = data.credits?.crew?.find(person => person.job === 'Director')?.name;
    
    return {
      ...data,
      director
    };
  } catch (error) {
    console.error('Ошибка при получении деталей фильма:', error);
    throw error;
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(`${TMDb_URL}/trending/movie/week?api_key=${API_KEY_TMDb}&language=ru-RU`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Ошибка получения трендовых фильмов:', error);
    return [];
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await fetch(`${TMDb_URL}/movie/top_rated?api_key=${API_KEY_TMDb}&language=ru-RU&page=1`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Ошибка получения лучших фильмов:', error);
    return [];
  }
};