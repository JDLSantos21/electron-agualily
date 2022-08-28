const sbAsociadosBtn = document.getElementById("sbAsociadosBtn")

sbAsociadosBtn.addEventListener('click',()=>{

  ipc.send('reqAsociadosData')

  asociadosContainer.classList.add("containerDesplegado")
  incidenciasContainer.classList.remove('showIncContainer')
  despachoContainer.classList.remove('containerDesplegado')
  blackout.classList.add('show-blackout')
  localStorage.setItem('despPage-activa','false');
  localStorage.setItem('IncPage-activa','false');

  if(asociadosContainer.classList.contains('containerDesplegado')){
    localStorage.setItem('sociosPage-activa','true');
  }else{
    localStorage.setItem('sociosPage-activa','false');
  }

})

if(localStorage.getItem('sociosPage-activa') === 'true'){
  asociadosContainer.classList.add('containerDesplegado')
}else{
  asociadosContainer.classList.remove('containerDesplegado')
}


const detalleSocios = document.getElementById('detalleSocios')


const swapSocios = document.getElementById('swapBtn-socios')
const swapEquipos = document.getElementById('swapBtn-equipos')
const swapSociosContainer = document.getElementById('swapSocios-container')
const swapEquiposContainer = document.getElementById('swapEquipos-container')
let estadoSwap;

function swapAsociados(){
  
  if(estadoSwap === true){
    swapEquipos.classList.add('listaDatos-button--active')
    swapEquiposContainer.classList.add("listaDatos-container-active")
    swapSocios.classList.remove('listaDatos-button--active')
    swapSociosContainer.classList.remove('listaDatos-container-active')
  }else{
    swapEquipos.classList.remove('listaDatos-button--active')
    swapEquiposContainer.classList.remove("listaDatos-container-active")
    swapSocios.classList.add('listaDatos-button--active')
    swapSociosContainer.classList.add('listaDatos-container-active')
  }

}

swapAsociados()

swapSocios.addEventListener('click',()=>{
  estadoSwap = false
  swapAsociados()
})

swapEquipos.addEventListener('click',()=>{
  estadoSwap = true
  swapAsociados()
})


const listaSocios = document.getElementById('listaSocios')
const listaEquipos = document.getElementById('listaEquipos')

ipc.on('allSociosData',async (event,allSocios)=>{

  let showSocio ='';

  allSocios.map((socio)=>{

    showSocio += `
    
    <div class="item-socio" id="${socio.id_asociado}">
      <p class="socio-name">${socio.nombre_negocio}</p>
    </div>
    
    `
  })

  listaSocios.innerHTML = showSocio;

})

ipc.on('allEquiposData',async (event,allEquipos)=>{

  let showEquipo ='';

  allEquipos.map((equipo)=>{

    showEquipo += `
    
    <div class="item-socio" id="${equipo.id_equipo}">
      <p class="socio-name">${equipo.id_equipo} - ${equipo.modelo}</p>
    </div>
    
    `
  })

  listaEquipos.innerHTML = showEquipo;

})

const regSocioBtn = document.getElementById("regSocio")
const regEquipoBtn = document.getElementById("regEquipo")
const asigEquipoBtn = document.getElementById("asigEquipo")

regSocioBtn.addEventListener("click",()=>{
  ipc.send("openSociosWin")
})
regEquipoBtn.addEventListener("click",()=>{
  ipc.send("openEquiposWin")
})
asigEquipoBtn.addEventListener("click",()=>{
  ipc.send("openAsigEquipoWin")
})


   