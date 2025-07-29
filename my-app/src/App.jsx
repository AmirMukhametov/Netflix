import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import { MovieModal } from './components/MovieModal/MovieModal';
import { MyAccount } from './pages/MyAccount/MyAccount';
import { MyListPage } from './pages/MyListPage/MyListPage';
import { searchMovies } from './services/movieApi';
import { TMDbMovieModal } from './components/TMDbMovieModal/TMDbMovieModal';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTMDbModalOpen, setIsTMDbModalOpen] = useState(false);
  const [selectedTMDbMovie, setSelectedTMDbMovie] = useState(null);

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

  const handleTMDbMovieClick = (movie) => {
    console.log('TMDb movie clicked in App:', movie);
    setSelectedTMDbMovie(movie);
    setIsTMDbModalOpen(true);
  };
  
  const handleCloseTMDbModal = () => {
    setIsTMDbModalOpen(false);
    setSelectedTMDbMovie(null);
  };

  // Отладка состояния модального окна
  useEffect(() => {
    console.log('TMDb Modal State changed:', { 
      isTMDbModalOpen, 
      selectedTMDbMovie: selectedTMDbMovie?.title 
    });
  }, [isTMDbModalOpen, selectedTMDbMovie]);

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
          <Route path='/' element={<HomePage onTMDbMovieClick={handleTMDbMovieClick} />} />
          <Route path='/movies' element={<HomePage onTMDbMovieClick={handleTMDbMovieClick} />} />
          <Route path='/series' element={<MyAccount />} />
          <Route path='/my-list' element={<MyListPage />} />
        </Routes>
        <MovieModal 
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
        <TMDbMovieModal
          movie={selectedTMDbMovie}
          isOpen={isTMDbModalOpen}
          onClose={handleCloseTMDbModal}
        />
      </div>
    </Router>
  );
}

export default App;