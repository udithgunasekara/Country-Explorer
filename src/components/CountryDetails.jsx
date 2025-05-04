import React from 'react';
import { Link } from 'react-router-dom';

const CountryDetails = ({ country }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 max-w-4xl mx-auto">
      <div className="md:flex">
        <div className="md:w-1/2 p-6 flex items-center bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="w-full">
            <img 
              src={country.flags.png} 
              alt={`Flag of ${country.name.common}`} 
              className="w-full max-h-96 object-contain shadow-md rounded-lg border border-gray-200"
            />
            <h1 className="text-3xl font-bold mt-6 text-center text-gray-800">
              {country.name.common}
            </h1>
            <p className="text-center text-gray-500 mt-2">
              {country.name.official}
            </p>
          </div>
        </div>
        
        <div className="p-8 md:w-1/2">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2 border-gray-100">
              Country Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Native Name</h3>
                  <p className="text-gray-700">
                    {Object.values(country.name.nativeName)[0]?.common || country.name.common}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Population</h3>
                  <p className="text-gray-700">{country.population.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Region</h3>
                  <p className="text-gray-700">{country.region}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Capital</h3>
                  <p className="text-gray-700">{country.capital?.[0] || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Currency</h3>
                  <p className="text-gray-700">
                    {Object.values(country.currencies).map(c => c.name).join(', ') || 'N/A'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Languages</h3>
                  <p className="text-gray-700">
                    {Object.values(country.languages).join(', ') || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {country.borders && country.borders.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2 border-gray-100">
                Neighboring Countries
              </h2>
              <div className="flex flex-wrap gap-3">
                {country.borders.map(border => (
                  <Link 
                    key={border} 
                    to={`/country/${border}`}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;