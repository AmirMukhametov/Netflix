import React, { useState, useRef, useEffect } from 'react';
import { SearchSuggestions } from '../SearchSuggestions/SearchSuggestions';
import styles from './SearchInput.module.css';

export const SearchInput = ({ onSearch, searchResults, isLoading, onMovieClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      onSearch(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleMovieSelect = (movie) => {
    onMovieClick(movie);
    setShowSuggestions(false);
    setSearchTerm('');
  };

  return (
    <div className={styles.searchContainer} ref={inputRef}>
      <input
        type="text"
        placeholder="Поиск фильмов..."
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.searchInput}
      />
      <SearchSuggestions
        movies={searchResults}
        onMovieClick={handleMovieSelect}
        isLoading={isLoading}
        isVisible={showSuggestions}
      />
    </div>
  );
};