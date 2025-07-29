// import React from 'react';
// import styles from './SearchResults.module.css';

// export const SearchResults = ({ movies, onMovieClick, isLoading }) => {
//   if (isLoading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.loading}>Поиск фильмов...</div>
//       </div>
//     );
//   }

//   if (!movies || movies.length === 0) {
//     return null;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.resultsGrid}>
//         {movies.map((movie) => (
//           <div 
//             key={movie.imdbID}
//             className={styles.movieCard}
//             onClick={() => onMovieClick(movie)}
//           >
//             <div className={styles.posterContainer}>
//               {movie.Poster !== 'N/A' ? (
//                 <img 
//                   src={movie.Poster} 
//                   alt={movie.Title}
//                   className={styles.poster}
//                 />
//               ) : (
//                 <div className={styles.noPoster}>
//                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
//                     <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//                     <circle cx="8.5" cy="8.5" r="1.5"></circle>
//                     <polyline points="21,15 16,10 5,21"></polyline>
//                   </svg>
//                 </div>
//               )}
//             </div>
//             <div className={styles.movieInfo}>
//               <h3 className={styles.title}>{movie.Title}</h3>
//               <p className={styles.year}>{movie.Year}</p>
//               <p className={styles.type}>{movie.Type}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }; 