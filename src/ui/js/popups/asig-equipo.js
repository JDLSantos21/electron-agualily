const { ipcRenderer } = require("electron");

const asociado = document.getElementById('asociado')
const equipo = document.getElementById('equipo')
const btnRegistrar = document.getElementById('btnRegistrar')

ipc = ipcRenderer

ipc.send('sendAsigData')

ipc.on('dataAsigEquipo',(event,equipos)=>{
  
  let showEquiposOptions = '<option value="select">Seleccionar</option>'

  equipos.map((equipo)=>{

    showEquiposOptions +=  `
    <option value="${equipo.id_equipo}">${equipo.tipo_equipo === 1001 ? 'Nevera':'Anaquel'} ${equipo.modelo}</option>
    `
  })

  equipo.innerHTML = showEquiposOptions

})

ipc.on('dataAsigSocios',(event,socios)=>{
  
  let showSociosOptions = '<option value="select">Seleccionar</option>'

  socios.map((socio)=>{

    showSociosOptions +=  `
    <option value="${socio.id_asociado}">${socio.nombre_negocio}</option>
    `
  })

  asociado.innerHTML = showSociosOptions

})

function regAsociacion() {
  
  let newAsociacion = {
    asociaciones_idsocio:asociado.value,
    asociaciones_idequipo:equipo.value,
    fecha_asociacion:fecha.value
  }

  if(asociado.value === 'select' || equipo.value === 'select' || fecha.value === ''){
    Swal.fire({
      title:'¡Todos los datos son requeridos!',
      text:"Es necesario completar toda la información.",
      icon:'warning',
      timer:5000
     })
  }else{
    async function sendToDb() {
      await ipc.invoke('addNewAsociacion',newAsociacion);
    }

    sendToDb()

    asociado.value = 'select'
    equipo.value = 'select'
    fecha.value = ''

    Swal.fire({
      title:'¡Enhorabuena se ha realizado la asociación!',
      icon:'success',
      timer:5000
     })
  }

}

btnRegistrar.addEventListener('click',(e)=>{
  e.preventDefault()
  regAsociacion()
  ipc.send('sendAsigData')
})