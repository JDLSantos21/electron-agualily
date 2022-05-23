const { ipcRenderer } = require('electron');
const { default: Swal } = require('sweetalert2');
ipc = ipcRenderer

const RegCombustible = document.getElementById('btn-send');
const ficha = document.getElementById('ficha');
const chofer = document.getElementById('chofer');
const kilometraje = document.getElementById('kilometraje');
const tanqueActual = document.getElementById('tanqueActual');
const galones = document.getElementById('galones');
const fecha = document.getElementById('fecha');
const firma = document.getElementById('firma');
const comentario = document.getElementById('comment');
const btnConsulta = document.getElementById('btnConsulta');
const btnRegReab = document.getElementById('btnRegReab');
const sidebarCombustible = document.getElementById('sidebarCombustible');
const actualSBtn = document.getElementById('actualSBtn');

sidebarCombustible.addEventListener('click',()=>{
  incidenciasContainer.classList.remove('showIncContainer')
  despachoContainer.classList.remove('containerDesplegado')
  localStorage.setItem('IncPage-activa','false');
  localStorage.setItem('despPage-activa','false');
})

RegCombustible.addEventListener('click',(e)=>{
  console.log(chofer.value);

  const newRegister = {
    ficha:ficha.value,
    chofer:chofer.value,
    kilometraje:kilometraje.value,
    galones:galones.value,
    fecha:fecha.value,
    firma:firma.value,
    comentario:comentario.value,
    tanqueactual:tanqueActual.value
  }

  async function registrarFicha () {

    await ipc.invoke("add",newRegister);

  }

  registrarFicha();

})



btnConsulta.addEventListener('click',()=>{
  ipc.send('winConsult');
})

const reabCantidad = document.getElementById('reabCantidad');
const reabFecha = document.getElementById('reabFecha');
const reabFirma = document.getElementById('reabFirma');
const inputRegPass = document.getElementById('inputRegPass');




btnRegReab.addEventListener('click', async (e)=>{
  e.preventDefault();
  
  const newReab = {
    Galones:reabCantidad.value,
    Fecha:reabFecha.value,
    Firma:reabFirma.value,
  }
  async function registrarReab () {
    await ipc.invoke("addReab",newReab);
  }
  let pass = inputRegPass.value;
  if(pass === 'Santos021'){
     registrarReab();

     reabCantidad.value = ''
     reabFecha.value = '' //reset inputs registro reab.
     reabFirma.value = ''
     inputRegPass.value = ''

     Swal.fire({
      title:'Registro Santisfactorio',
      text:'¡Se ha actualizado la Disponibilidad!',
      icon:'success',
      timer:5000
     })

  }else{
    Swal.fire({
      title:'¡Contraseña Incorrecta!',
      icon:'error',
      timer:5000
    })
  }

  setTimeout(()=>{
    console.log('Este es el timeout!!');
    ipc.send('dispNow');
  },500);

})

