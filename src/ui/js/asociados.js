const sbAsociadosBtn = document.getElementById("sbAsociadosBtn")
const detalleSocios = document.getElementById('detalleSocios')

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
arregloSocios = []
arregloEquipos = []


ipc.on('allSociosData',async (event,allSocios)=>{
  
  const filtrarSocio = document.getElementById("searchSocios")

    const filtrar =()=>{

      let userSocio = filtrarSocio.value.toLowerCase();

      listaSocios.innerHTML = ""
      
      for (const socio of allSocios) {
        arregloSocios.push(socio)
        let nombreSocio = socio.nombre_negocio.toLowerCase();
        
        if(nombreSocio.indexOf(userSocio) !== -1){
          listaSocios.innerHTML += `
              <div class="item-socio" id="${socio.id_asociado}">
                <p class="socio-name">${socio.nombre_negocio}</p>
              </div>
             `
            }
            selectItemSocio()
          }
          if(listaSocios.innerHTML === ""){
            listaSocios.innerHTML = `<p>Socio no encontrado...</p>`
          }
      }
      filtrarSocio.addEventListener("keyup",filtrar)
      filtrar()
})

ipc.on('allEquiposData',async (event,allEquipos)=>{

  const filtrarEquipos = document.getElementById("searchEquipos")

  const filtrar =()=>{

    let userEquipo = filtrarEquipos.value.toLowerCase();

    listaEquipos.innerHTML = ""
    
    for (const equipo of allEquipos) {
      arregloEquipos.push(equipo)
      let nombreEquipo = equipo.id_equipo.toString();
      
      if(nombreEquipo.indexOf(userEquipo) !== -1){
        listaEquipos.innerHTML += `
            <div class="item-equipo" id="${equipo.id_equipo}">
              <p class="socio-name">${equipo.id_equipo} - ${equipo.modelo}</p>
            </div>
           `
          }
          selectItemSocio()
        }
        if(listaEquipos.innerHTML === ""){
          listaEquipos.innerHTML = `<p>Equipo no encontrado...</p>`
        }
    }
    filtrarEquipos.addEventListener("keyup",filtrar)
    filtrar()



  // let showEquipo ='';

  // allEquipos.map((equipo)=>{

  //   arregloEquipos.push(equipo)

  //   showEquipo += `
    
  //   <div class="item-socio" id="${equipo.id_equipo}">
  //     <p class="socio-name">${equipo.id_equipo} - ${equipo.modelo}</p>
  //   </div>
    
  //   `
  // })

  // listaEquipos.innerHTML = showEquipo;

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


// INTERVALO PARA QUE SE PUEDA DETECTAR LOS ITEMS-SOCIOS

async function selectItemSocio() {
  
  const itemSocios = document.querySelectorAll('.item-socio')
  
  for (let i = 0; i < itemSocios.length; i++) {
      itemSocios[i].addEventListener('click',()=>{

        detalleSocios.classList.add('show-ventana')

      })
  }

  await showSelectItemSociosData()
  console.log('entro el setout')
  
} 

if(asociadosContainer.classList.contains('containerDesplegado')){
  ipc.send('reqAsociadosData')
}

function getShowSelectItemSociosData() {
  return showSelectItemSociosData();
}


