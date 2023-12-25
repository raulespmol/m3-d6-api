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
    spanResult.innerText =
    `Lo sentimos! Ha ocurrido un error (${error.message})`
  }
}

async function renderOptions(URL){
  try {
    const currencies = await getCurrencies(URL)
    currencies.forEach(c => {
      const option = document.createElement('option')
      option.value = c.codigo
      option.innerText = c.nombre
  
      select.appendChild(option)
    })
  } catch (error) {
    spanResult.innerText =
    `Lo sentimos! Ha ocurrido un error (${error.message})`
  }
}

renderOptions(API)