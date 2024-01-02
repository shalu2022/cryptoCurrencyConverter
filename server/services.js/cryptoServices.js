const axios = require('axios')

exports.getCryptoList = async () => {  
    const apiUrl = `${process.env.COINGECKO_URL}/coins/list`
    const cryptoList = await axios.get(apiUrl)
    return cryptoList.data;
};

exports.getCurrencyList = async () => {  
  const apiUrl = `${process.env.COINGECKO_URL}/simple/supported_vs_currencies`
  const currencyList = await axios.get(apiUrl)
  return currencyList.data;
};

exports.getExchangeRate = async (source, target) => {  
  const apiUrl = `${process.env.COINGECKO_URL}/simple/price?ids=${source}&vs_currencies=${target}`
  const exchangeRate = await axios.get(apiUrl)
  return exchangeRate.data;
};

  