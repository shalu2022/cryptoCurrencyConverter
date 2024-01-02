const express = require("express");
const router = express.Router();
const cryptoController = require("../controllers/cryptoController");


// Crypto Convertor Routes

router.get("/getList", cryptoController.apiCryptoList);
router.get("/getCurr", cryptoController.apiCurrencyList);
router.get("/getExchangeRate", cryptoController.apiExchangeRate)


module.exports = router;