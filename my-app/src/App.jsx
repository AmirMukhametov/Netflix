import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { MyListPage } from './pages/MyListPage';
import { MyAccount } from './pages/MyAccount';
import { searchMovies } from './services/movieApi';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <Router>
      <div className='App'>
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path='/' element={<HomePage searchResults={searchResults} isLoading={isLoading} />} />
          <Route path='/my-list' element={<MyListPage />} />
          <Route path='/log-in' element={<MyAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;