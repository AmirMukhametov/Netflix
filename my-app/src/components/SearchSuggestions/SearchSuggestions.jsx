import React from 'react';
import styles from './SearchSuggestions.module.css';

export const SearchSuggestions = ({ movies, onMovieClick, isLoading, isVisible }) => {
  if (!isVisible || !movies.length) return null;

  return (
    <div className={styles.suggestionsContainer}>
      {isLoading ? (
        <div className={styles.loading}>Поиск...</div>
      ) : (
        <ul className={styles.suggestionsList}>
          {movies.map((movie) => (
            <li 
              key={movie.imdbID} 
              className={styles.suggestionItem}
              onClick={() => onMovieClick(movie)}
            >
              <div className={styles.movieInfo}>
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'} 
                  alt={movie.Title}
                  className={styles.moviePoster}
                />
                <div className={styles.movieDetails}>
                  <h4 className={styles.movieTitle}>{movie.Title}</h4>
                  <p className={styles.movieYear}>{movie.Year}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};