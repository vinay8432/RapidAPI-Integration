const { fetchOpenEndedFunds, fetchMutualFundFamilies } = require('../utils/rapidAPI');

// Fetch Open-Ended Funds by Fund Family
exports.getFundsByFamily = async (req, res) => {
  try {
    const { family } = req.query; // Get the fund family from query parameters
    if (!family) {
      return res.status(400).json({ error: 'Mutual fund family is required' });
    }

    const funds = await fetchOpenEndedFunds(); // Fetch all open-ended funds
    const filteredFunds = funds.filter(
      (fund) =>
        fund['Mutual_Fund_Family'] === family &&
        fund['Scheme_Type'] === 'Open Ended Schemes'
    );

    if (filteredFunds.length === 0) {
      return res.status(404).json({ message: 'No funds found for this family' });
    }

    res.status(200).json({ funds: filteredFunds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMutualFundFamilies = async (req, res) => {
  try {
    const fundFamilies = await fetchMutualFundFamilies();
    res.status(200).json({ fundFamilies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};