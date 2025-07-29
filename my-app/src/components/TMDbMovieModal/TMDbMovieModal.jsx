import React, { useEffect, useState } from 'react';
import { getTMDbMovieDetails } from '../../services/movieApi';
import styles from './TMDbMovieModal.module.css';

export const TMDbMovieModal = ({ movie, isOpen, onClose }) => {
    console.log('TMDbMovieModal render:', { isOpen, movie: movie?.title });
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загружаем детальные данные фильма при открытии модального окна
  useEffect(() => {
    if (isOpen && movie?.id) {
      setIsLoading(true);
      setError(null);
      
      getTMDbMovieDetails(movie.id)
        .then(details => {
          setMovieDetails(details);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Ошибка загрузки деталей фильма:', err);
          setError('Не удалось загрузить детали фильма');
          setIsLoading(false);
        });
    }
  }, [isOpen, movie]);

  // Обработчик клика по фону для закрытия
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Обработчик клавиши Escape
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Добавляем/убираем обработчик клавиши Escape
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
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
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Загрузка деталей фильма...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className={styles.retryButton}>
              Попробовать снова
            </button>
          </div>
        ) : movieDetails ? (
          <div className={styles.movieDetails}>
            <div className={styles.movieHeader}>
              <div className={styles.posterContainer}>
                {movieDetails.poster_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} 
                    alt={movieDetails.title}
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
                <h2 className={styles.title}>{movieDetails.title}</h2>
                <div className={styles.meta}>
                  {movieDetails.release_date && (
                    <span className={styles.year}>
                      {new Date(movieDetails.release_date).getFullYear()}
                    </span>
                  )}
                  {movieDetails.runtime && (
                    <span className={styles.runtime}>
                      {Math.floor(movieDetails.runtime / 60)}ч {movieDetails.runtime % 60}м
                    </span>
                  )}
                  {movieDetails.vote_average && (
                    <span className={styles.rating}>
                      ⭐ {movieDetails.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
                {movieDetails.genres && (
                  <div className={styles.genres}>
                    {movieDetails.genres.slice(0, 3).map(genre => (
                      <span key={genre.id} className={styles.genre}>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.movieBody}>
              {movieDetails.overview && (
                <div className={styles.plot}>
                  <h3>Описание</h3>
                  <p>{movieDetails.overview}</p>
                </div>
              )}

              <div className={styles.details}>
                {movieDetails.director && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Режиссер:</span>
                    <span className={styles.value}>{movieDetails.director}</span>
                  </div>
                )}
                {movieDetails.credits?.cast && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>В ролях:</span>
                    <span className={styles.value}>
                      {movieDetails.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}
                    </span>
                  </div>
                )}
                {movieDetails.production_countries && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Страна:</span>
                    <span className={styles.value}>
                      {movieDetails.production_countries.map(country => country.name).join(', ')}
                    </span>
                  </div>
                )}
                {movieDetails.original_language && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Язык:</span>
                    <span className={styles.value}>
                      {movieDetails.original_language.toUpperCase()}
                    </span>
                  </div>
                )}
                {movieDetails.budget && movieDetails.budget > 0 && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Бюджет:</span>
                    <span className={styles.value}>
                      ${(movieDetails.budget / 1000000).toFixed(1)}M
                    </span>
                  </div>
                )}
                {movieDetails.revenue && movieDetails.revenue > 0 && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Сборы:</span>
                    <span className={styles.value}>
                      ${(movieDetails.revenue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.error}>
            <p>Не удалось загрузить информацию о фильме</p>
          </div>
        )}
      </div>
    </div>
  );
};