import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white shadow-md dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          World Countries
        </Link>
        <div className="flex items-center gap-12">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors duration-300 text-white text-md"
            aria-label={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            Theme {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link to="/favorites" className='text-xl font-bold text-white bg-red-700 px-4 py-2 rounded-lg'> My Favorites</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;