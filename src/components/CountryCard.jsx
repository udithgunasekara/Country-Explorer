import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const CountryCard = ({ country }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.includes(country.cca3);

  const handleFavorite = (e) => {
    e.preventDefault();
    isFavorite ? removeFavorite(country.cca3) : addFavorite(country.cca3);
  };

  return (
    <Link 
      to={`/country/${country.name.common}`}
      className="group bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-600"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          onClick={handleFavorite}
          className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-700/90 rounded-full shadow-sm hover:scale-110 transition-transform"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">
          {country.name.common}
        </h2>
        <div className="space-y-1 text-gray-600 dark:text-gray-300">
          <p className="flex items-center">
            <span className="inline-block w-4 h-4 mr-2 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </span>
            {country.population.toLocaleString()}
          </p>
          <p className="flex items-center">
            <span className="inline-block w-4 h-4 mr-2 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </span>
            {country.region}
          </p>
          <p className="flex items-center">
            <span className="inline-block w-4 h-4 mr-2 text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </span>
            {country.capital?.[0] || 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;