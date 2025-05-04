import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          World Explorer
        </Link>
      </div>
    </header>
  );
};

export default Header;