import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../../services/movieApi';
import styles from './MovieModal.module.css';

export const MovieModal = ({ movie, isOpen, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && movie?.imdbID) {
      setIsLoading(true);
      getMovieDetails(movie.imdbID)
        .then(details => {
          setMovieDetails(details);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Ошибка загрузки деталей фильма:', error);
          setIsLoading(false);
        });
    }
  }, [isOpen, movie]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {isLoading ? (
          <div className={styles.loading}>Загрузка деталей фильма...</div>
        ) : movieDetails ? (
          <div className={styles.movieDetails}>
            <div className={styles.movieHeader}>
              <div className={styles.posterContainer}>
                {movieDetails.Poster !== 'N/A' ? (
                  <img 
                    src={movieDetails.Poster} 
                    alt={movieDetails.Title}
                    className={styles.poster}
                  />
                ) : (
                  <div className={styles.noPoster}>
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21,15 16,10 5,21"></polyline>
                    </svg>
                  </div>
                )}
              </div>
              
              <div className={styles.movieInfo}>
                <h2 className={styles.title}>{movieDetails.Title}</h2>
                <div className={styles.meta}>
                  <span className={styles.year}>{movieDetails.Year}</span>
                  <span className={styles.runtime}>{movieDetails.Runtime}</span>
                  {movieDetails.imdbRating && (
                    <span className={styles.rating}>⭐ {movieDetails.imdbRating}</span>
                  )}
                </div>
                <div className={styles.genres}>
                  {movieDetails.Genre?.split(', ').map(genre => (
                    <span key={genre} className={styles.genre}>{genre}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.movieBody}>
              <div className={styles.plot}>
                <h3>Описание</h3>
                <p>{movieDetails.Plot}</p>
              </div>

              <div className={styles.details}>
                {movieDetails.Director && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Режиссер:</span>
                    <span className={styles.value}>{movieDetails.Director}</span>
                  </div>
                )}
                {movieDetails.Actors && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>В ролях:</span>
                    <span className={styles.value}>{movieDetails.Actors}</span>
                  </div>
                )}
                {movieDetails.Country && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Страна:</span>
                    <span className={styles.value}>{movieDetails.Country}</span>
                  </div>
                )}
                {movieDetails.Language && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Язык:</span>
                    <span className={styles.value}>{movieDetails.Language}</span>
                  </div>
                )}
                {movieDetails.Rated && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Рейтинг:</span>
                    <span className={styles.value}>{movieDetails.Rated}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.error}>Ошибка загрузки данных</div>
        )}
      </div>
    </div>
  );
}; 