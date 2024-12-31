// Updated Portfolio.js with Improved CSS Styling
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [userName, setUserName] = useState('');
  const [fundFamilies, setFundFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState('');
  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState('');
  const [nav, setNav] = useState('');
  const [units, setUnits] = useState('');
  const navigate = useNavigate();

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }
      const response = await axios.get('https://rapid-backend.vercel.app/api/portfolio', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response",response)
      setPortfolio(response.data.investments);
      setUserName(response.data.userName); // Assuming backend returns userName
    } catch (error) {
      alert('Failed to fetch portfolio!');
      navigate('/login'); // Redirect to login on error
    }
  };

  const fetchFundFamilies = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }
      const response = await axios.get('https://rapid-backend.vercel.app/api/funds/fund-families', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFundFamilies(response.data.fundFamilies);
    } catch (error) {
      alert('Failed to fetch fund families!');
    }
  };

  const fetchSchemesForFamily = async (family) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }
      const response = await axios.get(`https://rapid-backend.vercel.app/api/funds/funds?family=${family}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchemes(response.data.funds);
    } catch (error) {
      alert('Failed to fetch schemes for the selected family!');
    }
  };

  const addMutualFund = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }
      await axios.post(
        'https://rapid-backend.vercel.app/api/portfolio/add',
        { schemeName: selectedScheme, nav, units },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Mutual fund added successfully!');
      fetchPortfolio(); // Refresh portfolio after adding
    } catch (error) {
      alert('Failed to add mutual fund!');
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    navigate('/login'); // Redirect to login page
  };

  useEffect(() => {
    fetchPortfolio();
    fetchFundFamilies();
  }, []);

  useEffect(() => {
    if (selectedFamily) {
      fetchSchemesForFamily(selectedFamily);
    }
  }, [selectedFamily]);

  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1>Portfolio</h1>
        {userName && <h2>Welcome, {userName}</h2>}
        <button onClick={logout} className="logout-button">Logout</button>
      </header>

      <section className="add-mutual-fund">
        <h3>Add a Mutual Fund</h3>
        <div className="fund-family">
          <label>Select Fund Family:</label>
          <select
            value={selectedFamily}
            onChange={(e) => setSelectedFamily(e.target.value)}
          >
            <option value="">--Select Family--</option>
            {fundFamilies.map((family, index) => (
              <option key={index} value={family}>
                {family}
              </option>
            ))}
          </select>
        </div>

        {selectedFamily && (
          <div className="scheme-selection">
            <label>Select Scheme:</label>
            <select
              value={selectedScheme}
              onChange={(e) => {
                const selectedScheme = schemes.find(
                  (scheme) => scheme.Scheme_Name === e.target.value
                );
                setSelectedScheme(selectedScheme.Scheme_Name);
                setNav(selectedScheme.Net_Asset_Value); // Auto-populate NAV
              }}
            >
              <option value="">--Select Scheme--</option>
              {schemes.map((scheme, index) => (
                <option key={index} value={scheme.Scheme_Name}>
                  {scheme.Scheme_Name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Units"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            />
            <button onClick={addMutualFund} className="add-button">Add Mutual Fund</button>
          </div>
        )}
      </section>

      <section className="investments">
        <h3>Your Investments</h3>
        <ul>
          {portfolio.map((investment, index) => (
            <li key={index}>
              {investment.fundName} - Units: {investment.units} - Current Value: {investment.currentValue} - Purchase Value: {investment.purchasePrice}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Portfolio;