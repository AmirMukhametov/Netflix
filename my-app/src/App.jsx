import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { MovieModal } from './components/MovieModal/MovieModal';
import { MyAccount } from './pages/MyAccount';
import { MyListPage } from './pages/MyListPage';
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
    <Router>
      <div className='App'>
        <Header 
          onSearch={handleSearch} 
          searchResults={searchResults}
          isLoading={isLoading}
          onMovieClick={handleMovieClick}
        />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<HomePage />} />
          <Route path='/series' element={<MyAccount />} />
          <Route path='/my-list' element={<MyListPage />} />
        </Routes>
        <MovieModal 
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </Router>
  );
}

export default App;