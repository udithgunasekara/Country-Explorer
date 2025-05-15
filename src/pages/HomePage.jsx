import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';
import SkeletonLoader from '../components/SkeletonLoader';
import CountryService from '../service/api';

const HomePage = ({ countries = [], isLoading, error, setCountries }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const handleSearch = async (searchTerm) => {
    setSearchError('');
    setLocalLoading(true);

    try {
      const data = searchTerm ? 
        await CountryService.searchByName(searchTerm) : 
        countries;
      
      setFilteredCountries(data);
      
      if (data.length === 0) {
        setSearchError('No countries found matching your search');
      }
    } catch (err) {
      setSearchError('Failed to perform search. Please try again.');
      setFilteredCountries([]);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleFilter = async (region) => {
    try {
      setLocalLoading(true);
      const data = region ? 
        await CountryService.filterByRegion(region) : 
        countries;
      setFilteredCountries(data);
    } catch (err) {
      setSearchError('Failed to apply filter');
      setFilteredCountries([]);
    } finally {
      setLocalLoading(false);
    }
  };

  if (isLoading) return <SkeletonLoader />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <Search onSearch={handleSearch} />
        <Filter onFilter={handleFilter} />
      </div>

      {searchError && (
        <div className="text-red-500 text-center py-8">{searchError}</div>
      )}

      {localLoading ? (
        <SkeletonLoader />
      ) : (
        <>
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
      )}
    </>
  );
};

export default HomePage;