import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { SearchInput } from '../SearchInput/SearchInput';
import logo from '../../../public/netflix.png';

export const Header = ({ onSearch }) => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <NavLink to='/'>
        <img className={styles.logo} src={logo} alt="logo" />
      </NavLink>

      <SearchInput onSearch={onSearch} />
      
      <div className={styles.navLinks}>
        <NavLink to='/' className={location.pathname === '/' ? styles.active : ''}>
          <h1>Главная</h1>
        </NavLink>
        <NavLink to='/my-list' className={location.pathname === '/my-list' ? styles.active : ''}>
          <h1>Избранное</h1>
        </NavLink>
        <NavLink to='/log-in' className={location.pathname === '/log-in' ? styles.active : ''}>
          <h1>Вход</h1>
        </NavLink>
      </div>
      
      
    </header>
  );
};