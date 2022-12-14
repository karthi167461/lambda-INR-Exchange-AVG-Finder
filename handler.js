'use strict';

const axios = require('axios');



module.exports.getAvgINR = async (event) => {

  let config = {
    headers: {
      "apikey": process.env.APIKEY,
      "Accept-Encoding": "gzip,deflate,compress"
    }
  };

  let fixerApi = await getFixerApi(config);
  
  let anotherAPi = await getExchangeRate(config);

  let averageValue = calculateAvgINR(fixerApi, anotherAPi);

  return {
    status: 200,
    data: {
      averageValueForINR: averageValue 
    }
  }
};


function calculateAvgINR(fixerApi, anotherAPi)
{
    return (fixerApi.data.rates['INR']+anotherAPi.data.rates['INR'])/2;
}

async function getFixerApi(config) {
  return await axios.get("https://api.apilayer.com/fixer/latest?base=USD",config);
}

async function getExchangeRate(config) {
  return await axios.get("https://api.apilayer.com/exchangerates_data/latest?base=USD",config);
}
