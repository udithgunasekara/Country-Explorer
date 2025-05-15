// service/api.js
import axios from 'axios';

//just creating sessions for caching 


const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1/',
  timeout: 5000,
});

const CountryService = {
  getAllCountries: async () => {
  try {
    const cachedData = localStorage.getItem('countryService');
    if (cachedData) {
      return JSON.parse(cachedData); // Return cached data
    }

    const response = await api.get('/all');
    localStorage.setItem('countryService', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch countries');
  }
},
  // searchByName: async (name) => {
  //   try {
  //     const response = await api.get(`/name/${name}`);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error('Country not found');
  //   }
  // },
  searchByName: async (name) => {
  if (!name || name.trim() === '') {
    return []; // Return empty array for empty search term
  }

  try {
    const response = await api.get(`/name/${name}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return []; // No results found
    }
    throw new Error('Failed to fetch countries');
  }
},

  filterByRegion: async (region) => {
    try {
      const response = await api.get(`/region/${region}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to filter by region');
    }
  },

  getByCountryCode: async (code) => {
    try {
      const response = await api.get(`/alpha/${code}`);
      return response.data[0];
    } catch (error) {
      throw new Error('Invalid country code');
    }
  },
};

export default CountryService;