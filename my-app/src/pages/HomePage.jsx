import React, { useState } from 'react';
import { SearchResults } from '../components/SearchResults/SearchResults';
import { MovieModal } from '../components/MovieModal/MovieModal';

function HomePage({ searchResults, isLoading }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <main>
        <SearchResults 
          movies={searchResults}
          onMovieClick={handleMovieClick}
          isLoading={isLoading}
        />
      </main>
      <MovieModal 
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default HomePage;