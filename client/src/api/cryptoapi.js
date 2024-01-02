import Axios from 'axios'
Axios.defaults.baseURL = "https://crypto-currency-converter-sigma.vercel.app/api/v1";
// const baseUrl = process.env.REACT_APP_BASE_URL

export const getAllCryptoList = async () =>  {
 const response = await Axios.get(`/getList`)
 return response.data
}

export const getAllCurrencies = async () =>  {
 const response = await Axios.get(`/getCurr`)
 return response.data
}

export const getExchangeRate = async (payload) =>  {
    const params = {
        source: payload.source,
        target: payload.target,
        amount: payload.amount
    }
    const response = await Axios.get(`/getExchangeRate`, {params})
    return response.data
   }
