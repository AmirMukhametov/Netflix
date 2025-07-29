import React, { useState } from 'react';
import styles from './TrendingMovies.module.css';

const MOVIES_VISIBLE = 5;

export const TrendingMovies = ({ trendingMovies }) => {
  const [startIndex, setStartIndex] = useState(0);

  // Бесконечный сдвиг вперёд
  const handleNext = () => {
    setStartIndex((prevIndex) =>
      (prevIndex + MOVIES_VISIBLE) % trendingMovies.length
    );
  };

  // Бесконечный сдвиг назад
  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      (prevIndex - MOVIES_VISIBLE + trendingMovies.length) % trendingMovies.length
    );
  };

  // Получить 5 фильмов, начиная с текущего индекса — с цикличностью
  const visibleMovies = Array.from({ length: MOVIES_VISIBLE }).map((_, i) => {
    const index = (startIndex + i) % trendingMovies.length;
    return trendingMovies[index];
  });

  return (
    <div className={styles.trendingWrapper}>
      <h1 className={styles.trendingMoviesTitle}>Тренды</h1>

      <div className={styles.carousel}>
        <button onClick={handlePrev} className={styles.navButton}>←</button>

        <div className={styles.trendingMovies}>
        {visibleMovies
            .filter(movie => movie && movie.poster_path) // ← фильтруем только те, у кого есть постер
            .map((movie) => (
                <div key={movie.id} className={styles.movieCard}>
                    <div className={styles.moviePoster}>
                        <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title || 'Без названия'}
                        />
                    </div>
                    <div className={styles.movieInfo}>
                        <h2 className={styles.movieTitle}>{movie.title}</h2>
                        <p className={styles.movieYear}>{movie.release_date}</p>
                    </div>
                </div>
))}

        </div>

        <button onClick={handleNext} className={styles.navButton}>→</button>
      </div>
    </div>
  );
};
