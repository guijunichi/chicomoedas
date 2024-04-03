const form = document.getElementById("form")

const consultarCotacao = async (code, code2) => {
  let url =  `https://economia.awesomeapi.com.br/last/${code}-${code2}`
  const response = await (await fetch(url)).json()
  return response
}

let rotulo = 'valor'
let moedaSelect = document.getElementById('moeda2')

form.button.onclick = async(e) => {
  e.preventDefault()
    let code = form.moeda1.value
    let code2 = form.moeda2.value
    if(code == code2){
      emitirMensagem()
      form.resultado.value = ''
    }
    let res = await consultarCotacao(code, code2)
    res = res[code+code2]
    if(moedaSelect.value == 'BRL'){
      rotulo = 'R$' 
    } else if(moedaSelect.value == 'EUR'){
      rotulo = '€'
    } else if(moedaSelect.value == 'JPY'){
      rotulo = '¥'
    } else if(moedaSelect.value == 'ARS' || moedaSelect.value == 'USD'){
      rotulo = '$'
    }
    let converter = parseFloat(form.converter.value)
    let resul = parseFloat(res.ask)
    converter = converter * resul
    form.resultado.value = `${rotulo} ${(converter).toFixed(2)}`
}

function emitirMensagem(){
  alert("Por favor, selecione um valor para conversão que seja diferente do primeiro campo.")
}