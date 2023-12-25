const inputCLP = document.getElementById('clp-input')
const select = document.getElementById('currency-select')
const btnConvert = document.getElementById('convert-btn')
const spanResult = document.getElementById('result')

const API = 'https://mindicador.cl/api'

async function getCurrencies(URL){
  try {
    const res = await fetch(URL)
    const data = await res.json()
    const { uf, dolar, euro, utm } = data
    return[ uf, dolar, euro, utm ];
  } catch (error) {
    spanResult.innerText = //cambiar a return?
    `Lo sentimos! Ha ocurrido un error (${error})`
  }
}

async function renderOptions(){
  
}

getCurrencies(API)