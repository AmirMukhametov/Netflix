import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { SearchInput } from '../SearchInput/SearchInput';
import logo from '../../assets/logo.png';

export const Header = ({ onSearch, searchResults, isLoading, onMovieClick }) => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Link to='/'>
        <div className={styles.logoContainer}>
          <p className={styles.logoName}>CineFlix</p>
          <img className={styles.logoImg} src={logo} alt="logo" /> 
        </div>
      </Link>

      <SearchInput 
        onSearch={onSearch}
        searchResults={searchResults}
        isLoading={isLoading}
        onMovieClick={onMovieClick}
      />
      
      <div className={styles.navLinks}>
        <Link to='/' className={location.pathname === '/' ? styles.active : ''}>
          <h1>Главная</h1>
        </Link>
        <Link to='/series' className={location.pathname === '/series' ? styles.active : ''}>
          <h1>Избранное</h1>
        </Link>
        <Link to='/my-list' className={location.pathname === '/my-list' ? styles.active : ''}>
          <h1>Вход</h1>
        </Link>
      </div>
      
    </header>
  );
};