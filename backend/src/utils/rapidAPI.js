const axios = require('axios');
const MutualFund = require('../models/MutualFundModel');

// RapidAPI base URL and headers
const rapidAPIBaseURL = 'https://latest-mutual-fund-nav.p.rapidapi.com';
const rapidAPIHeaders = {
  'x-rapidapi-host': process.env.RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.RAPIDAPI_KEY,
};

// Function to fetch open-ended mutual funds
const fetchOpenEndedFunds = async () => {
  try {
    const response = await axios.get(`${rapidAPIBaseURL}/latest`, {
      headers: rapidAPIHeaders,
      params: { Scheme_Type: 'Open' }, // Filter for open-ended schemes
    });

    if (response.data && response.data.length > 0) {
      return response.data; // Return the list of open-ended funds
    } else {
      throw new Error('No open-ended funds available');
    }
  } catch (error) {
    console.error('Error fetching open-ended funds:', error.response?.data || error.message);
    throw new Error('Unable to fetch open-ended funds');
  }
};
// const fetchAllFunds = async () => {
//   try {
//     const response = await axios.get(`${rapidAPIBaseURL}/latest`, {
//       headers: rapidAPIHeaders,
//       params: { Scheme_Type: 'Open' }, // Use Scheme_Type if applicable
//     });

//     if (response.data && response.data.length > 0) {
//       return response.data; // Return all funds
//     } else {
//       throw new Error('No funds available');
//     }
//   } catch (error) {
//     console.error('Error fetching funds:', error.response?.data || error.message);
//     throw new Error('Unable to fetch funds');
//   }
// };
const fetchMutualFundFamilies = async () => {
  try {
    const fundFamilies = await MutualFund.distinct('Mutual_Fund_Family');// Get unique families
    return fundFamilies;
  } catch (error) {
    console.error('Error fetching mutual fund families:', error.message);
    throw new Error('Unable to fetch mutual fund families');
  }
};

module.exports = { fetchOpenEndedFunds, fetchMutualFundFamilies };
