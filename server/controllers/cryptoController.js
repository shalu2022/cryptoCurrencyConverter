const cryptoServices = require('../services.js/cryptoServices');

exports.apiCryptoList = async (req, res) => {
  try {
    const list = await cryptoServices.getCryptoList();
    res.json({data: list.slice(0,100)})
  } catch (error) {
    res.status(500).json({ error });
  }
};
exports.apiCurrencyList = async (req, res) => {
    try {
      const list = await cryptoServices.getCurrencyList();
      res.json({data: list})
    } catch (error) {
      res.status(500).json({ error});
    }
  };
exports.apiExchangeRate = async (req, res) => {
    try {
      const rate = await cryptoServices.getExchangeRate(req.query.source, req.query.target);
      const exchangedAmount = (Object.values(Object.values(rate)[0])[0])*req.query.amount
      res.json({data: exchangedAmount})
    } catch (error) {
      res.status(500).json({ error});
    }
  };
