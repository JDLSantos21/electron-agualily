
// const Chart = require('chart.js');
const chartET = document.getElementById('chartET');
const chartTR = document.getElementById('chartTR');
const chartAP = document.getElementById('chartAP');

const incidenciasContainer = document.getElementById('incidenciasContainer');
const sbIncidenciasBtn = document.getElementById('sidebarIncidencias');
const sidebarDespacho = document.getElementById('sidebarDespacho');

sbIncidenciasBtn.addEventListener('click',()=>{
  incidenciasContainer.classList.add('showIncContainer')
  despachoContainer.classList.remove('containerDesplegado')
  asociadosContainer.classList.remove('containerDesplegado')
  blackout.classList.add('show-blackout')
  localStorage.setItem('despPage-activa','false');
  localStorage.setItem('sociosPage-activa','false');
  localStorage.setItem("seccion","incidencias")

  if(incidenciasContainer.classList.contains('showIncContainer')){
    localStorage.setItem('IncPage-activa','true');
  }else{
    localStorage.setItem('IncPage-activa','false');
  }

})

if(localStorage.getItem('IncPage-activa') === 'true'){
  incidenciasContainer.classList.add('showIncContainer')
}else{
  incidenciasContainer.classList.remove('showIncContainer')
}


let chartAPtags = [];
let chartAPdataA = [];
let chartAPdataR = [];
let chartETtags = ['Abiertos','Resueltos'];
let chartTRtags = ["Urgente","Alta","Media","Baja"];
let dataIncidencias = [];
let datosTR = []
let sumaResuelto = 0;
let sumaAbierto = 0;

let tiempores1 = 0;
let tiempores2 = 0;
let tiempores3 = 0;
let tiempores4 = 0;

let tiempores1Div = 0;
let tiempores2Div = 0;
let tiempores3Div = 0;
let tiempores4Div = 0;

 const tbodyInc = document.getElementById('tbody-inc');

ipc.on('dataIncidencias',(event,incidencias)=>{
  for(let i =0;i<incidencias.length;i++){
   dataIncidencias.push(incidencias[i]);
   datosTR.push(incidencias[i].prioridad);   
   
   if(incidencias[i].estado === 0){

    if(incidencias[i].prioridad === 1){
      tiempores1 = tiempores1 + incidencias[i].tiempores;
      tiempores1Div++;
    }else if(incidencias[i].prioridad === 2){
      tiempores2 = tiempores2 + incidencias[i].tiempores;
      tiempores2Div++;
    }else if(incidencias[i].prioridad === 3){
      tiempores3 = tiempores3 + incidencias[i].tiempores;
      tiempores3Div++;
    }else{
      tiempores4 = tiempores4 + incidencias[i].tiempores;
      tiempores4Div++;
    }

   }
   
  }

  tiempores1 = tiempores1/tiempores1Div;
  tiempores2 = tiempores2/tiempores2Div;
  tiempores3 = tiempores3/tiempores3Div;
  tiempores4 = tiempores4/tiempores4Div;

  // GRAFICA TIEMPO DE RESOLUCION.
new Chart(chartTR,{
  type: 'bar',
  data: {
    labels:chartTRtags,
    datasets:[{
      label:'Ocultar/Mostrar',
      data:[tiempores4.toFixed(1),tiempores3.toFixed(1),tiempores2.toFixed(1),tiempores1.toFixed(1)],
      backgroundColor:['red','#F35911','#E2D915','#51A3FA'],
      datalabels: {
        color:'#fff',
      },
      
    }],
  },
  options: {
    responsive: true,
    indexAxis:'y',
    plugins: {
      legend: {
        position: 'bottom',
        labels:{
          color:'#000',
          usePointStyle:true,
        }
      },
      labels:false,
      title: {
        display: true,
        text: 'Tiempo promedio de resolución por severidad (Dias)',
        color:'#000'
      },
    }
  },
  plugins: [ChartDataLabels],
  
})

})

// console.log(data[0].asignado)
ipc.send("getIncidencias");


ipc.on('dataAsignados',(event,results)=>{

for(let i=0;i<results.length;i++){
  chartAPtags.push(results[i].nombre)
  chartAPdataA.push(results[i].abierto)
  chartAPdataR.push(results[i].resuelto)
  sumaAbierto = results[i].abierto + sumaAbierto;
  sumaResuelto = results[i].resuelto + sumaResuelto;
}

  // GRAFICAS  
new Chart(chartAP,{
  type: 'bar',
  data: {
    labels:chartAPtags,
    datasets:[{
      label:'Abiertos',
      data:chartAPdataA,
      backgroundColor:['orange'],
      datalabels: {
        color:'#fff',
      },
      
    },
    {
      label:'Resueltos',
      data:chartAPdataR,
      backgroundColor:["#2650BF"],
      datalabels: {
        color:'#fff',
      }, 
    }],
  },
  options: {
    responsive: true,
    indexAxis:'x',
    plugins: {
      legend: {
        position: 'bottom',
        labels:{
          color:'#000',
          usePointStyle:true,
        }
      },
      labels:false,
      title: {
        display: true,
        text: 'Ticket asignado por persona',
        color:'#000'
      },
    }
  },
  plugins: [ChartDataLabels],
  
})

// GRAFICA CASOS RESULTOS Y ABIERTOS
new Chart(chartET,{
  type: 'pie',
  data: {
    labels:chartETtags,
    datasets:[{
      data:[sumaAbierto,sumaResuelto],
      backgroundColor:['orange','#2650BF']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels:{
          color:'#000',
          usePointStyle:true,
        }
      },
      labels:{
        fontColor:'#fff',
      },
      title: {
        display: true,
        text: 'Estado de Tickets',
        color:'#000'
      },
    }
  },
  // plugins: [ChartDataLabels]
})


})





//ABRIR VENTANA REGISTRO DE INCIDENCIAS
const btnWinRegIncidencia = document.getElementById('btnWinRegIncidencia');

btnWinRegIncidencia.addEventListener('click',()=>{
  ipc.send('winRegIncidencia');
})

btnAllRegistros.addEventListener('click',()=>{
  ipc.send('winShowAllRegIncidencias')
})

//OBTENIENDO DATOS DE INCIDENCIAS
