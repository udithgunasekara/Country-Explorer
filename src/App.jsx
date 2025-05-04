import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import Header from './components/Header';
import CountryService from './service/api';

function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await CountryService.getAllCountries();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  countries={countries} 
                  isLoading={isLoading} 
                  error={error} 
                  setCountries={setCountries} 
                />
              } 
            />
            <Route path="/country/:name" element={<CountryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;