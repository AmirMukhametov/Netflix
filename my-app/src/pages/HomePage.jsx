import React from 'react';
import { fetchTrendingMovies } from '../services/movieApi';
import { useState, useEffect } from 'react';


function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setTrendingMovies);
  }, []);

  console.log(trendingMovies.map(movie => movie));

  
  return (
    <main>
      <h1>Тренды</h1>
      <div>
        {
          trendingMovies.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            </div>
          ))
        }
      </div>
    </main>
  );
}

export default HomePage;