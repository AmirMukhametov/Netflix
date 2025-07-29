import React from 'react';
import styles from './TrendingMovies.module.css';

export const TrendingMovies = ({ trendingMovies }) => {
  return (
    <>
        <h1 className={styles.trendingMoviesTitle}>Тренды</h1>
        <div className={styles.trendingMovies}>
            {trendingMovies.map((movie) => (
                <div 
                    key={movie.id} 
                    className={styles.movieCard}
                >
                    <div className={styles.moviePoster}>
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    </div>
                    <div className={styles.movieInfo}>
                        <h2 className={styles.movieTitle}>{movie.title}</h2>
                        <p className={styles.movieYear}>{movie.release_date}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
    
  );
};