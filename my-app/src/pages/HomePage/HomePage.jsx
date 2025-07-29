import React from 'react';
import { fetchTrendingMovies } from '../../services/movieApi';
import { useState, useEffect } from 'react';
import { TrendingMovies } from '../../components/TrendingMovies/TrendingMovies';
import styles from './HomePage.module.css';
function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setTrendingMovies);
  }, []);

  console.log(trendingMovies.map(movie => movie));

  
  return (
    <main className={styles.main}>
      <TrendingMovies trendingMovies={trendingMovies} />
    </main>
  );
}

export default HomePage;