import React from 'react';
import styles from './HomePage.module.css';

import { fetchTrendingMovies, fetchTopRatedMovies } from '../../services/movieApi';
import { useState, useEffect } from 'react';
import { TrendingMovies } from '../../components/TrendingMovies/TrendingMovies';
import { PopularsMovies } from '../../components/PopularsMovies/PopularsMovies'

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setTrendingMovies);
  }, []);

  useEffect(() => {
    fetchTopRatedMovies().then(setPopularMovies);
  }, []);

  console.log(trendingMovies.map(movie => movie));

  
  return (
    <main className={styles.main}>
      <TrendingMovies trendingMovies={trendingMovies} />
      <PopularsMovies popularMovies={popularMovies} />
    </main>
  );
}

export default HomePage;