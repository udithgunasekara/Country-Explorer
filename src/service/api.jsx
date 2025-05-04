import React from 'react';
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1/',
  timeout: 5000, // 5 seconds timeout
});

// API service functions
const CountryService = {
  /**
   * Get all countries
   * @returns {Promise} Array of country objects
   */
  getAllCountries: async () => {
    try {
      const response = await api.get('/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching all countries:', error);
      throw error;
    }
  },

  /**
   * Search countries by name
   * @param {string} name - Country name to search for
   * @returns {Promise} Array of matching country objects
   */
  searchByName: async (name) => {
    try {
      const response = await api.get(`/name/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Error searching countries by name (${name}):`, error);
      throw error;
    }
  },

  /**
   * Filter countries by region
   * @param {string} region - Region to filter by
   * @returns {Promise} Array of country objects in the region
   */
  filterByRegion: async (region) => {
    try {
      const response = await api.get(`/region/${region}`);
      return response.data;
    } catch (error) {
      console.error(`Error filtering countries by region (${region}):`, error);
      throw error;
    }
  },

  /**
   * Get country details by country code
   * @param {string} code - Country code (cca2, cca3, ccn3)
   * @returns {Promise} Country details object
   */
  getByCountryCode: async (code) => {
    try {
      const response = await api.get(`/alpha/${code}`);
      return response.data[0]; // Return the first (and only) country
    } catch (error) {
      console.error(`Error fetching country by code (${code}):`, error);
      throw error;
    }
  },
};

export default CountryService;