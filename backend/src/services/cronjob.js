const cron = require('node-cron');
const Portfolio = require('../models/portfolioModel');
const MutualFund = require('../models/MutualFundModel');
const { fetchOpenEndedFunds } = require('../utils/rapidAPI');

const startCronJobs = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      console.log('Running hourly portfolio and mutual fund update...');

      // Fetch funds from Rapid API
      const funds = await fetchOpenEndedFunds();

      if (!funds || funds.length === 0) {
        console.log('No funds data received from API');
        return;
      }

      // Fetch all existing Scheme_Codes from the database
      const existingFunds = await MutualFund.find({}, { Scheme_Code: 1, _id: 0 });
      const existingSchemeCodes = new Set(existingFunds.map(fund => fund.Scheme_Code));

      // Prepare bulk operations for MutualFund
      const bulkOps = funds.map((fund) => {
        if (existingSchemeCodes.has(fund.Scheme_Code)) {
          // Update existing document only if necessary
          return {
            updateOne: {
              filter: { Scheme_Code: fund.Scheme_Code },
              update: { $set: fund },
            },
          };
        } else {
          // Insert new document
          return {
            insertOne: {
              document: fund,
            },
          };
        }
      });

      // Execute bulk operations in MongoDB
      const result = await MutualFund.bulkWrite(bulkOps);
      console.log(
        `MutualFund update completed. Inserted: ${result.insertedCount}, Updated: ${result.modifiedCount}`
      );

      // Step 2: Update Portfolio investments
      const portfolios = await Portfolio.find({});
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
      console.log('Portfolio values updated successfully.');

    } catch (error) {
      console.error('Error during portfolio or mutual fund update:', error.message);
    }
  });
};

module.exports = { startCronJobs };
