import React from 'react';
import styles from './HomePage.module.css';
import { fetchTrendingMovies, fetchTopRatedMovies } from '../../services/movieApi';
import { useState, useEffect } from 'react';
import { TrendingMovies } from '../../components/TrendingMovies/TrendingMovies';
import { PopularsMovies } from '../../components/PopularsMovies/PopularsMovies'

function HomePage({ onTMDbMovieClick }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setTrendingMovies);
  }, []);

  useEffect(() => {
    fetchTopRatedMovies().then(setPopularMovies);
  }, []);

  // Отладка
  console.log('HomePage render:', { 
    onTMDbMovieClick: !!onTMDbMovieClick, 
    trendingMoviesCount: trendingMovies.length,
    popularMoviesCount: popularMovies.length,
    popularMoviesType: typeof popularMovies
  });

  return (
    <main className={styles.main}>
      <TrendingMovies 
        trendingMovies={trendingMovies} 
        onMovieClick={onTMDbMovieClick}
      />
      <PopularsMovies 
        popularMovies={popularMovies} 
        onMovieClick={onTMDbMovieClick}
      />
    </main>
  );
}

export default HomePage;