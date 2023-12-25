//DOM Elements
const inputCLP = document.getElementById('clp-input')
const select = document.getElementById('currency-select')
const btnConvert = document.getElementById('convert-btn')
const spanResult = document.getElementById('result')

const API = 'https://mindicador.cl/api'

renderOptions(API)

//Funciones
async function getCurrencies(URL){ //Obtener datos y llamar monedas
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

async function renderOptions(URL){ //Renderizar opciones de las monedas llamadas
  try {
    const currencies = await getCurrencies(URL)
    currencies.forEach(c => {
      const option = document.createElement('option')
      option.value = c.codigo
      option.innerText = c.nombre
  
      select.appendChild(option)
    })
    console.log(currencies);
  } catch (error) {
    spanResult.innerText =
    `Lo sentimos! Ha ocurrido un error (${error.message})`
  }
}

async function fetchSelected(){ //Constular API de la moneda seleccionada
  let selectedCurrency = select.value
  let selectedURL = `${API}/${selectedCurrency}`
  try {
    const res = await fetch(selectedURL)
    const data = await res.json()
    return data
  } catch (error) {
      spanResult.innerText =
      `Lo sentimos! Ha ocurrido un error (${error.message})`
  }
}

async function convertCurrency(){ //Obtener CLP desde input y valor de moneda seleccionada para conversion
  const valueCLP = parseInt(inputCLP.value)
  const selectedCurrency = await fetchSelected()
  const currencyValue = selectedCurrency.serie[0].valor
  
  const conversion = (valueCLP / currencyValue).toFixed(2)
  
  spanResult.innerText = `
    ${conversion}
  `
}




btnConvert.addEventListener('click', convertCurrency)
select.addEventListener('change', fetchSelected)




//PENDIENTE