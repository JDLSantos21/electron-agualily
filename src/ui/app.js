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
const blackout = document.getElementById('blackout');

sidebarCombustible.addEventListener('click',()=>{
  blackout.classList.remove('show-blackout')
  incidenciasContainer.classList.remove('showIncContainer')
  despachoContainer.classList.remove('containerDesplegado')
  asociadosContainer.classList.remove('containerDesplegado')
  localStorage.setItem('IncPage-activa','false');
  localStorage.setItem('despPage-activa','false');
  localStorage.setItem('sociosPage-activa','false');
  localStorage.setItem("seccion","combustible")
})

RegCombustible.addEventListener('click',(e)=>{
  e.preventDefault()

  if(ficha.value === 'select' || chofer.value === 'select' || kilometraje.value === '' || galones.value === '' || fecha.value === '' || firma.value === ''){

    Swal.fire({
      icon: 'warning',
      title: '¡Completa los datos!',
      text: 'Es necesario completar todos los datos. En caso de Planta u Otro. Poner kilometraje en 0.',
    })

  }else{

    Swal.fire({
      icon: 'success',
      title: 'Consumo Registrado',
      showConfirmButton: false,
      timer: 900
    })

    const newRegister = {
      ficha:ficha.value,
      chofer:chofer.value,
      kilometraje:kilometraje.value,
      galones:galones.value,
      fecha:fecha.value,
      firma:firma.value,
      comentario:comentario.value,
    }
  
    async function registrarFicha () {
      await ipc.invoke("add",newRegister);
    }
  
    registrarFicha();

    ficha.value = "select"
    chofer.value = "select"
    kilometraje.value = ""
    galones.value = ""
    fecha.value = ""
    firma.value = ""
    comentario.value = ""
    
  }

  setTimeout(()=>{
    console.log('Este es el timeout!!');
    ipc.send('dispNow');
  },500);
  
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

const questionIcon = document.getElementById("questionIcon")

questionIcon.addEventListener("click",()=>{

  Swal.fire({
    title: "Información",
    icon: 'question',
    text:`Programa Desarrollado & Diseñado por Jose A. De Los Santos en el año 2022.       
    Preguntas consultas o dudas, favor de comunicarse a JDLSantos21@hotmail.com o al 849-356-0359.`,
    footer:'Todos los Derechos Reservados ©.',
    timerProgressBar:true,
    timer:10000,
    iconHtml: '!',
    confirmButtonText: "Cerrar",

    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })

})