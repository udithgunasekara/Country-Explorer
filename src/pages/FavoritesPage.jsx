// pages/FavoritesPage.js
import React from 'react';
import CountryCard from '../components/CountryCard';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesPage = ({ countries }) => {
  const { favorites } = useFavorites();
  const favoriteCountries = countries.filter(c => favorites.includes(c.cca3));

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Favorite Countries</h1>
      {favoriteCountries.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-300">
          No favorite countries yet. Start adding some!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteCountries.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;