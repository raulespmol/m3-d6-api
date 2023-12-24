const inputCLP = document.getElementById('clp-input')
const select = document.getElementById('currency-select')
const btnConvert = document.getElementById('convert-btn')
const spanResult = document.getElementById('result')

const API = 'https://mindicador.cl/api'

async function getCurrencies(URL){
  const res = await fetch(URL)
  const data = await res.json()
  console.log(data);
}

getCurrencies(API)