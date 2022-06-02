// const {getConnection} = require('../../database');

const { ipcRenderer } = require("electron");
ipc = ipcRenderer
let moment = require('moment'); // require
moment.locale('es');

const consultPrint = document.getElementById('consultPrint');
consultPrint.addEventListener('click',()=>{
  window.print();
})

const tBody = document.getElementById('tbody');
const cBtn = document.getElementById('cBtn');
const consultFicha = document.getElementById('consultFicha');
const firstDate = document.getElementById('firstDate');
const lastDate = document.getElementById('lastDate');
const btnDispReset = document.getElementById('btnDispReset');


/*----------DEPLIEGUE CONSULTA TOTAL---------*/

ipc.on('registrosTotal',(event,results)=>{
  let template = ''
  const list = results
  list.forEach(element => {
    let fecha = moment(element.Fecha);
    template+=`
    
    <tr>
      <td>${element.Ficha}</td>
      <td>${element.Chofer}</td>
      <td>${element.Kilometraje}</td>
      <td>${element.Galones}</td>
      <td>${fecha.format('dddd Do MMMM YYYY, h:mm:ss a.')}</td>
      <td>${element.Firma}</td>
      <td>${element.Comentario}</td>
    </tr>
    `
  });

  tBody.innerHTML = template

})

document.addEventListener("DOMContentLoaded",()=>{
  ipc.send("allConsultData");
})

/*------------------------------------------------------------------*/


/*----------DEPLIEGUE CONSULTA PERSONALIZADA---------*/

// async function consultReg () {
//   await ipc.invoke("getReg",filterData);
// }

// consultReg();

cBtn.addEventListener('click',async (e)=>{
e.preventDefault();

const filterData = {
  ficha:consultFicha.value,
  firstDate:firstDate.value,
  lastDate:lastDate.value
}

async function consultReg () {
  await ipc.invoke("getReg",filterData);
}

consultReg();

})

ipc.on('registros',(event,results)=>{
  let sumaGalones = 0
  let restaKM = 0
  let sumaKM = 0
  let kmAnterior = 0
  let template = ''
  const list = results

  list.forEach(element => {

    sumaGalones += element.Galones

    if(kmAnterior && element.Kilometraje !== 0 && element.Kilometraje < kmAnterior){
      restaKM = kmAnterior - element.Kilometraje
      console.log(`${kmAnterior} - ${element.Kilometraje} = ${kmAnterior-element.Kilometraje}`)
      sumaKM += restaKM
    }

    let fecha = moment(element.Fecha);
    
    template+=`
    
    <tr>
    <td>${element.Ficha}</td>
    <td>${element.Chofer}</td>
    <td>${element.Kilometraje}</td>
    <td>${element.Galones}</td>
    <td>${fecha.format('dddd Do MMMM YYYY, h:mm:ss a.')}</td>
    <td>${element.Firma}</td>
    <td>${element.Comentario}</td>
    </tr>
    `
    kmAnterior = element.Kilometraje
    // console.log(`${restaKM}: ${fecha.format("dddd Do MMMM YYYY")}`)
  });

  tBody.innerHTML = template
  console.log(sumaGalones)
  console.log(sumaKM)
  console.log(sumaKM/sumaGalones)

  
})

/*------------------------------------------------------------------*/
