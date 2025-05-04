import React from 'react';
import { useState, useEffect } from 'react';
import Search from '../components/Search';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';
import SkeletonLoader from '../components/SkeletonLoader';

const HomePage = ({ countries = [], isLoading, error, setCountries }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  
  // Set filtered countries whenever the main countries array changes
  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setFilteredCountries(countries);
      return;
    }

    try {
      const data = await CountryService.searchByName(searchTerm);
      setFilteredCountries(data);
    } catch (err) {
      setFilteredCountries([]);
    }
  };

  const handleFilter = async (region) => {
    if (!region) {
      setFilteredCountries(countries);
      return;
    }

    try {
      const data = await CountryService.filterByRegion(region);
      setFilteredCountries(data);
    } catch (err) {
      setFilteredCountries([]);
    }
  };

  if (isLoading || localLoading) return <SkeletonLoader />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <Search onSearch={handleSearch} />
        <Filter onFilter={handleFilter} />
      </div>

      {filteredCountries.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-300">
          No countries found. Try a different search or filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCountries.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;