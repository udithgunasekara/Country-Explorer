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
      const response = await api.get('/all');
      if (!localStorage.key('countryService')){
         localStorage.setItem('countryService', response.data);
      }

      if (!response){
        return localStorage.getItem('countryService')
      }
      
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch countries');
    }
  },

  searchByName: async (name) => {
    try {
      const response = await api.get(`/name/${name}`);
      return response.data;
    } catch (error) {
      throw new Error('Country not found');
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