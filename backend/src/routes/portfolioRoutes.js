const express = require('express');
const {
  addInvestment,
  getPortfolio,
  removeInvestment,
  updateInvestmentValues,
  addSchemeToPortfolio, 
  updatePortfolioValues
} = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get user portfolio
router.get('/', authMiddleware, getPortfolio);

// Remove an investment from portfolio
router.delete('/remove/:investmentId', authMiddleware, removeInvestment);

router.post('/add', authMiddleware, addSchemeToPortfolio);

router.put('/update-values', authMiddleware, updatePortfolioValues);

module.exports = router;


