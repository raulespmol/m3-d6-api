//DOM Elements
const inputCLP = document.getElementById('clp-input')
const select = document.getElementById('currency-select')
const btnConvert = document.getElementById('convert-btn')
const spanResult = document.getElementById('result')
const spanError = document.getElementById('error')

const API = 'https://mindicador.cl/api'

renderOptions(API)

//Eventos
select.addEventListener('change', fetchSelected)
btnConvert.addEventListener('click', convertCurrency)
inputCLP.addEventListener('keydown', e => {
  if(e.key === 'Enter'){
    convertCurrency()
  }
})

//Funciones
async function getCurrencies(URL){ //Obtener datos y llamar monedas
  try {
    const res = await fetch(URL)
    const data = await res.json()
    const { uf, dolar, euro, utm } = data
    return[ uf, dolar, euro, utm ];
  } catch (error) {
    errorMessage(error)
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
    console.log(currencies); //BORRAR
  } catch (error) {
    errorMessage(error)
  }
}

async function fetchSelected(){ //Constular API de la moneda seleccionada
  let selectedCurrency = select.value
  let selectedURL = `${API}/${selectedCurrency}`
  
  try {
    const res = await fetch(selectedURL)
    const data = await res.json()
    console.log(data);
    return data
  } catch (error) {
    errorMessage(error)
  }
}

async function convertCurrency(){ //Obtener CLP desde input y valor de moneda seleccionada para conversion
  if(select.value != '0'){
    const valueCLP = parseInt(inputCLP.value)
    const selectedCurrency = await fetchSelected()
    const currencyValue = selectedCurrency.serie[0].valor
    
    if(valueCLP > 0){
      const conversion = (valueCLP / currencyValue).toFixed(2)
      spanResult.innerText = `${selectedCurrency.codigo === 'euro' ? '€' : '$'}${conversion}`
    } else {
      alert('Debes ingresar un monto mayor a cero')
    }
  }
}

function errorMessage(error){
  spanError.innerText =
    `Lo sentimos! Ha ocurrido un error \n
    (${error.message})`
}