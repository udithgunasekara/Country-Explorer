import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CountryDetails from '../components/CountryDetails';
import SkeletonLoader from '../components/SkeletonLoader';
import CountryService from '../service/api';

const CountryPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        let data;
        
        //Check if the parameter is a country code (typically 2 or 3 characters)
        //How about just we see it's int form or not?siur

        if (name.length <= 3) {
          data = await CountryService.getByCountryCode(name);
        } else {
          // If it's longer, it's probably a country name
          const searchResults = await CountryService.searchByName(name);
          data = searchResults[0]; // Take the first matching country
        }
        
        setCountry(data);
      } catch (err) {
        setError(`Could not find country: ${err.message}`);
        // Don't navigate away, just show the error
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [name, navigate]);

  if (isLoading) return <SkeletonLoader />;
  if (error) return (
    <div className="py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-6 py-2 bg-white dark:bg-gray-700 shadow-sm rounded flex items-center gap-2 dark:text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>
      <div className="text-red-500 text-center py-8">{error}</div>
    </div>
  );

  return (
    <div className="py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-12 px-6 py-2 bg-white dark:bg-gray-700 shadow-sm rounded flex items-center gap-2 dark:text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>

      {country && <CountryDetails country={country} />}
    </div>
  );
};

export default CountryPage;