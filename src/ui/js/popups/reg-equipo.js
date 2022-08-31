const { ipcRenderer } = require("electron")

ipc = ipcRenderer

const tipoEquipo = document.getElementById('tipo-equipo')
const modelo = document.getElementById('modelo')
const serial = document.getElementById('serial')
const fecha = document.getElementById('fecha')
const btnRegistrar = document.getElementById('btnRegistrar')


function regEquipo() {
  let newEquipo = {
    id_equipo: '',
    tipo_equipo:tipoEquipo.value,
    serial:serial.value,
    modelo:modelo.value,
    estado:0,
    equipo_fechareg:fecha.value
  }

  if(newEquipo.tipo_equipo === 'select' || newEquipo.serial === '' || newEquipo.modelo === '' || newEquipo.equipo_fechareg === ''){
    Swal.fire({
      title:'¡Todos los datos son requeridos!',
      text:"Es necesario completar toda la información.",
      icon:'warning',
      timer:5000
     })
  }else{
    async function sendToDb() {
      await ipc.invoke('addNewEquipo',newEquipo);
    }
    sendToDb()


    ipc.on('serialExist',(event,res)=>{
      
      if(res === 'si'){

        Swal.fire({
          title:'¡Este equipo ya esta registrado!',
          text:"Ya hay un equipo con este serial registrado.",
          icon:'warning'
         })

      }else{

        Swal.fire({
          title:'Equipo registrado!',
          text:"El equipo se ha registrado satisfactoriamente.",
          icon:'success',
          timer:5000
         })

        tipoEquipo.value = 'select'
        serial.value = ''
        modelo.value = ''
        fecha.value = ''

        ipc.send("reqAsociadosData")
      }
    })

  }
}

btnRegistrar.addEventListener('click',(e)=>{
  e.preventDefault()
  regEquipo()
})