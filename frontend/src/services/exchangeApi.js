const API_KEY = '57995a23c3fc9cc6e5244475';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export const fetchExchangeRates = async (baseCurrency = 'USD') => {
  try {
    const response = await fetch(`${BASE_URL}/latest/${baseCurrency}`);
    const data = await response.json();
    if (data.result === 'success') {
      return data.conversion_rates;
    }
    throw new Error('Exchange rate not available');
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};