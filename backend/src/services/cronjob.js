const cron = require('node-cron');
const Portfolio = require('../models/portfolioModel');
const { fetchOpenEndedFunds } = require('../utils/rapidAPI');

const startCronJobs = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      console.log('Running hourly portfolio update...');
      const portfolios = await Portfolio.find({});
      const funds = await fetchOpenEndedFunds();

      for (const portfolio of portfolios) {
        portfolio.investments.forEach((investment) => {
          const fund = funds.find((f) => f.Scheme_Name === investment.fundName);
          if (fund) {
            investment.currentValue = fund.Net_Asset_Value * investment.units;
          }
        });

        portfolio.updatedAt = Date.now();
        await portfolio.save();
      }

      console.log('Portfolio values updated successfully');
    } catch (error) {
      console.error('Error during portfolio update:', error.message);
    }
  });
};

module.exports = { startCronJobs };
