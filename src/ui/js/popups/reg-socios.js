const { ipcRenderer } = require("electron")
ipc = ipcRenderer

const negocioName = document.getElementById('negocioName')
const representanteName = document.getElementById('representanteName')
const cedula = document.getElementById('cedula')
const telefono = document.getElementById('telefono')
const fecha = document.getElementById('fecha')
const sector = document.getElementById('sector')
const calle = document.getElementById('calle')
const numeroCalle = document.getElementById('numero')
const btnRegistrar = document.getElementById('btnRegistrar')

function validateDominicanId(t){if("string"!=typeof t)return!1;if(t=t.trim(),!/^\d+$/.test(t))return!1;if(!(11===t.length))return!1;if(["00000000018","11111111123","00100759932","00105606543","00114272360","00200123640","00200409772","00800106971","01200004166","01400074875","01400000282","03103749672","03200066940","03800032522","03900192284","04900026260","05900072869","07700009346","00114532330","03121982479","40200700675","40200639953","00121581750","00119161853","22321581834","00121581800","09421581768","22721581818","90001200901","00301200901","40200452735","40200401324","10621581792"].includes(t))return!0;if("000"===t.substr(0,3))return!1;const r=parseInt(t.substr(10,1));return(10-t.substr(0,10).split("").map((t,r)=>{const n="1212121212".charAt(r),e=parseInt(t)*n;return e<10?e:parseInt(e/10)+e%10}).reduce((t,r)=>t+r)%10)%10===r}

function regSocio() {

  let direccion = `${calle.value} No.${numeroCalle.value}, ${sector.value}.`
  
  let newSocio = {
    id_asociado:'',
    nombre_negocio:negocioName.value,
    nombre_representante:representanteName.value,
    cedula_representante:cedula.value,
    telefono:telefono.value,
    direccion:direccion,
    asociado_fechareg:fecha.value,
    estado:0
  }

  if(newSocio.nombre_negocio === '' || newSocio.nombre_representante === '' || newSocio.cedula_representante === '' || newSocio.telefono === '' || numeroCalle.value === '' || newSocio.asociado_fechareg === '' || calle.value === '' || sector.value === ''){

    Swal.fire({
      title:'¡Todos los datos son requeridos!',
      text:"Es necesario completar toda la información.",
      icon:'warning',
      timer:5000
     })

  }else{

    if(validateDominicanId(newSocio.cedula_representante) === true){
      
      async function sendToDb() {
        await ipc.invoke('addNewSocio',newSocio);
      }
  
      sendToDb()
  
      negocioName.value = ''
      representanteName.value = ''
      cedula.value = ''
      telefono.value = ''
      fecha.value = ''
      sector.value = ''
      calle.value = ''
      numeroCalle.value = ''

      Swal.fire({
        title:'¡Socio registrado!',
        text:"El socio se ha registrado satisfactoriamente.",
        icon:'success',
        timer:5000
       })
       
       ipc.send("reqAsociadosData")


    }else{
      Swal.fire({
        title:'¡La cedula no es valida!',
        text:"Por favor, introduce una correcta.",
        icon:'warning',
        timer:5000
       })
    }
  }
  
}

btnRegistrar.addEventListener('click',(e)=>{
  e.preventDefault()
  regSocio()
})