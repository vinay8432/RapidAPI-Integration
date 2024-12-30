const express = require('express');
const { getFundsByFamily, getAllMutualFundFamilies} = require('../controllers/fundController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/funds', authMiddleware, getFundsByFamily);
router.get('/fund-families', authMiddleware, getAllMutualFundFamilies);

module.exports = router;
