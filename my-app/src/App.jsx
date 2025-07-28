import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { SearchResults } from './components/SearchResults/SearchResults';
import { MovieModal } from './components/MovieModal/MovieModal';
import { searchMovies } from './services/movieApi';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchMovies(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Ошибка поиска:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

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
      <Header onSearch={handleSearch} />
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

export default App;
