import React from 'react'
import styles from './Header.module.css'
import { SearchInput } from '../SearchInput/SearchInput'

import logo from '../../../public/netflix.png'

export const Header = ({ onSearch }) => {
  return (
    <header className={styles.header}>
        <img className={styles.logo} src={logo} alt="logo" />
        <SearchInput onSearch={onSearch} />
        <div className={styles.navLinks}>
          <h1>Главная</h1>
          <h1>Профиль</h1>
          <h1>Выйти</h1>
        </div>
    </header>
  )
}