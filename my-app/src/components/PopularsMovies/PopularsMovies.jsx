import React, { useState, useEffect } from 'react';
import styles from './PopularsMovies.module.css';

const MOVIES_VISIBLE = 5;

export const PopularsMovies = ({ popularMovies }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Плавный сдвиг вперёд на 1 элемент
  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setStartIndex((prevIndex) =>
        (prevIndex + 1) % popularMovies.length
      );
    }
  };

  // Плавный сдвиг назад на 1 элемент
  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setStartIndex((prevIndex) =>
        (prevIndex - 1 + popularMovies.length) % popularMovies.length
      );
    }
  };

  // Сброс состояния перехода после анимации
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [startIndex]);

  // Создаем массив всех фильмов для бесконечной прокрутки
  const extendedMovies = [...popularMovies, ...popularMovies];

  return (
    <div className={styles.trendingWrapper}>
      <h1 className={styles.trendingMoviesTitle}>Популярные</h1>

      <div className={styles.carousel}>
        <button 
          onClick={handlePrev} 
          className={styles.navButton}
          disabled={isTransitioning}
        >
          ←
        </button>

        <div className={styles.carouselTrack}>
          <div 
            className={styles.trendingMovies}
            style={{
              transform: `translateX(-${startIndex * 196}px)`, // 180px ширина + 16px gap
              transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none'
            }}
          >
            {extendedMovies
              .filter(movie => movie && movie.poster_path)
              .map((movie, index) => (
                <div key={`${movie.id}-${index}`} className={styles.movieCard}>
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
        </div>

        <button 
          onClick={handleNext} 
          className={styles.navButton}
          disabled={isTransitioning}
        >
          →
        </button>
      </div>
    </div>
  );
};