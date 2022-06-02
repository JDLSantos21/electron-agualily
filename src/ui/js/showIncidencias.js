const { ipcRenderer } = require('electron');
ipc = ipcRenderer
const tbodyInc = document.getElementById('tbody-inc');
const tdPrioridad = document.getElementById('td-prioridad');
let moment = require('moment'); // require
moment.locale('es'); 

ipc.on('dataIncidencias',(event,incidencias)=>{

   //INSERTANDO LOS DATOS A LA TABLA DE CONTROL DE INCIDENCIAS
   let = datosInsertar = ''
   const listaIncidencias = incidencias
   listaIncidencias.forEach(element => {

     let cadenaFechaReg = moment(element.fechareg)
     let cadenaFechaRes = element.fechares
     let tiempoResolucion = element.tiempores

     if(cadenaFechaRes === null){
       cadenaFechaRes = 'NA'
     }else{
      cadenaFechaRes = moment(cadenaFechaRes).format('D MMMM YYYY')
     }

     

     let prioridad = ''
     let estado = ''

     if(element.estado === 1){
       estado = 'Abierto'
     }else{
       estado = 'Resuelto'
     }

     if(element.prioridad === 1){
       prioridad = 'Baja';
     }else if(element.prioridad === 2){
       prioridad = 'Media';
     }else if(element.prioridad === 3){
       prioridad = 'Alta';
     }else{
       prioridad = 'Urgente';
     }

     datosInsertar+=`
  
     <tr>
       <td id="td-prioridad" class="td">${element.ID}</td>
       ${estado === 'Resuelto' ? `<td class='estado--resuelto td'>${estado}</td>` : `<td class='estado--abierto td'>${estado}</td>`}
       <td class="td">${prioridad}</td>
       <td class="td">${element.descripcion}</td>
       <td class="td">${cadenaFechaReg.format('D MMMM YYYY')}</td>
       <td class="td">${element.informante}</td>
       <td class="td">${element.asignado}</td>
       <td class="td">${cadenaFechaRes}</td>
       <td class="td">${tiempoResolucion === null ? `NA` : `${tiempoResolucion} Dias`}</td>
       <td class="td">${element.comentario}</td>
        ${element.fechares === null ? `<td class="actionTD"> <button class="updateRBtn" id="${element.ID}"> Terminar </button> </td>` : `<td class = "actionTDC"><i class="fa-solid fa-circle-check"></i></td>`}
      </tr>
     `
   });

   tbodyInc.innerHTML = datosInsertar

})

document.addEventListener("DOMContentLoaded",()=>{
  ipc.send("getIncidenciasReg");
})




const updateRBtn = document.getElementsByClassName('updateRBtn');
const btnVolverReg = document.getElementById("btnVolverReg");
const ticketRFormContainer = document.getElementById("ticketRFormContainer");
const fechaRes = document.getElementById("fechaRes");
// const tiempoRes = document.getElementById("tiempoRes");
const comentarioRes = document.getElementById("comentarioRes");
const resSendBtn = document.getElementById("resSendBtn");


setTimeout(()=>{
console.log(updateRBtn.length)
  for(let i=0;i<updateRBtn.length;i++){
    updateRBtn[i].addEventListener("click",()=>{
      let upBtn = updateRBtn[i].id;
      let upBtnID = upBtn;
      ticketRFormContainer.classList.add('containerDesplegado');

      resSendBtn.addEventListener('click',(e)=>{
        e.preventDefault()
        // updtIncidencia(upBtnID);
        let incUpdate = {
          ID:upBtnID,
          fechares:fechaRes.value,
          comentario:comentarioRes.value
        }
    
        console.log(incUpdate)
    

        if(incUpdate.fechares === ""){
          Swal.fire({
            title:'¡Completa los datos!',
            text:"La Fecha de Resolución es un campo obligatorio.",
            icon:'warning',
            timer:5000
           })
        }else{

          async function mandarUpdtIncidencia() {
            await ipc.invoke('addUpdtIncidencia',incUpdate);
          }

          mandarUpdtIncidencia()
          location.reload()
        }

       
      })
    })
  }

},100)

btnVolverReg.addEventListener("click",()=>{
  location.reload()
})