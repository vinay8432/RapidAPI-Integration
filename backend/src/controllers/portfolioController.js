const Portfolio = require('../models/portfolioModel');
const { fetchOpenEndedFunds } = require('../utils/rapidAPI');

// Fetch Portfolio for a User
exports.getPortfolio = async (req, res) => {
  try {
    const { _id } = req.user;

    const portfolio = await Portfolio.findOne({ userId: _id });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove an Investment
exports.removeInvestment = async (req, res) => {
  try {
    const { userId } = req.user;
    const { investmentId } = req.params;

    const portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    portfolio.investments = portfolio.investments.filter(
      (investment) => investment._id.toString() !== investmentId
    );

    portfolio.updatedAt = Date.now();

    await portfolio.save();

    res.status(200).json({ message: 'Investment removed successfully', portfolio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Scheme to Portfolio
exports.addSchemeToPortfolio = async (req, res) => {
  try {
    const { _id } = req.user; // User authentication
    const { schemeName, nav, units } = req.body;
    if (!schemeName || !nav || !units) {
      return res.status(400).json({ error: 'Scheme name, NAV, and units are required' });
    }

    let portfolio = await Portfolio.findOne({ userId:_id });

    if (!portfolio) {
      portfolio = new Portfolio({ userId:_id, investments: [] });
    }

    portfolio.investments.push({
      fundName: schemeName,
      units,
      purchasePrice: nav * units,
      currentValue: nav * units,
    });

    await portfolio.save();
    res.status(200).json({ message: 'Scheme added to portfolio', portfolio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Current Value of Portfolio Investments (Hourly Updates)
exports.updatePortfolioValues = async (req, res) => {
  try {
    const { _id } = req.user;
    const portfolio = await Portfolio.findOne({ userId: _id });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    const funds = await fetchOpenEndedFunds(); // Fetch all open-ended schemes

    portfolio.investments.forEach((investment) => {
      const fund = funds.find((f) => f.Scheme_Name === investment.fundName);
      if (fund) {
        investment.currentValue = fund.Net_Asset_Value * investment.units;
      }
    });

    portfolio.updatedAt = Date.now();
    await portfolio.save();

    res.status(200).json({ message: 'Portfolio values updated', portfolio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
