const showSelectItemSociosData = async function () {

  const todosSocios = document.querySelectorAll('.item-socio')

  for (let i = 0; i < todosSocios.length; i++) {
    
    todosSocios[i].addEventListener('click',()=>{
      let id_socios = todosSocios[i].id;
      let id_socio = id_socios;
      const contID = {
        ID:id_socio
      }

      function showDataSocios(id) {

        const socio = arregloSocios.filter(s => s.id_asociado == id)
        const equipo = arregloEquipos.filter(e => e.id_equipo == socio[0].equipo_asociado)
        let fechaSocio = moment(socio[0].asociado_fechareg,'')
        
        detalleSocios.innerHTML = `
        <i class="fa-solid fa-xmark closeBtnSocios" id="closeDetalleSocios"></i>

          <div class="negocio-title--container">
            <h1 class="negocio-title" id="negocioTitle">${socio[0].nombre_negocio}</h1>
            <p class="fecha-unionSocio">Fecha de unión: <i>${fechaSocio.format('dddd Do MMMM YYYY')}</i></p>
          </div>

          <div class="socios-generalInfo--container">
            <p class="general-info--item">PROPIETARIO Y/O REPRESENTANTE: <span id="itemSociosName" class="itemSocios">${socio[0].nombre_representante}</span></p>
            <p class="general-info--item">CÉDULA REPRESENTANTE: <span id="itemSociosCedula" class="itemSocios">${socio[0].cedula_representante}</span></p>
            <p class="general-info--item">TELÉFONO: <span id="itemSociosTel" class="itemSocios">${socio[0].telefono}</span></p>
            <p class="general-info--item">DIRECCIÓN: <span id="itemSociosDir" class="itemSocios">${socio[0].direccion}</span></p>
          </div>

          ${socio[0].estado === 0 ?`<div class="info-equipoAsociado--container">
          <div class="equipoAsociado-content">
            <p class="withoutEquipo"><i>Aun no hay un equipo asociado...</i></p>
            <button class="EA-btnAsociar">Asociar Equipo</button>
          </div>
        </div>`:`<div class="info-equipoAsociado--container">
        <div class="equipoAsociado-content-1">
          <p class="equipoAsociado">Equipo asociado</p>
        <div class="equipoData-subBox">
          <p><b>${equipo[0].tipo_equipo == 1001 ? "Nevera" : "Anaquel"} ${equipo[0].modelo}</b></p>
          <div class="subBox-equipoDetalle">
            <p class="subBox-IDEquipo"><span class="bold">ID del Equipo:</span></br>${equipo[0].id_equipo}</p>
            <p class="subBox-SerialEquipo"><span class="bold">Serial:</span></br>${equipo[0].serial}</p>
          </div>
        </div>
        <div class="equipoData-subBox--actions">
          <button class="subBox-actions-verDetalles subBox-btn" id="${equipo[0].id_equipo}">Ver detalles</button>
          <button class="subBox-actions-cambiar subBox-btn" id="${socio[0].id_asociado}">Cambiar Equipo</button>
        </div>
        </div>
          </div>`}

        `;

        document.getElementById('closeDetalleSocios').addEventListener('click',()=>{
          detalleSocios.classList.remove('show-ventana')
        })

      }
      
      showDataSocios(contID.ID)

      const socio = arregloSocios.filter(s => s.id_asociado == contID.ID)[0]

      if(socio.estado === 0){
        const botonAsociarEquipo = document.querySelector(".EA-btnAsociar");
        botonAsociarEquipo.addEventListener("click",()=>{
          ipc.send("openAsigEquipoWin")
        })
      }else{
        const btnSeeDetails = document.querySelector('.subBox-actions-verDetalles')
        const btnCambiarEquipo = document.querySelector('.subBox-actions-cambiar')
      }

    })

  }

}

const showSelectItemEquiposData = async function () {

  const todosEquipos = document.querySelectorAll('.item-equipo')

  for (let i = 0; i < todosEquipos.length; i++) {
    
    todosEquipos[i].addEventListener('click',()=>{
      let id_equipos = todosEquipos[i].id;
      let id_equipo = id_equipos;
      const contID = {
        ID:id_equipo
      }

      function showDataEquipos(id) {

        const equipo = arregloEquipos.filter(e => e.id_equipo == id)[0]
        console.log(equipo)
        const socio = arregloSocios.filter(s => s.equipo_asociado == id)
        let fechaEquipo = moment(equipo.equipo_fechareg)
        
        detalleEquipos.innerHTML = `
        <i class="fa-solid fa-xmark closeBtnSocios" id="closeDetalleEquipos"></i>

        <div class="title-equipo--container">
           <h1 class="equipo-title">Detalles del equipo</h1>
        </div>

        <div class="equipo-info--detalleEquipos">
          <p class="item-detalleEquipo">ID único: <span class="equipo-info--DE-data">${equipo.id_equipo}</span></p>
          <p class="item-detalleEquipo">Tipo: <span class="equipo-info--DE-data">${equipo.tipo_equipo == 1001 ? 'Nevera' : 'Anaquel'}</span></p>
          <p class="item-detalleEquipo">Modelo: <span class="equipo-info--DE-data">${equipo.modelo}</span></p>
          <p class="item-detalleEquipo">Serial: <span class="equipo-info--DE-data">${equipo.serial}</span></p>
          <p class="item-detalleEquipo">Fecha de Registro: <span class="equipo-info--DE-data">${fechaEquipo.format('dddd Do MMMM YYYY')}</span></p>
        </div>

        <div class="detalleEquipos--moves">
          <div class="table-moves--equipos">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">ID #</th>
                  <th scope="col">Acción</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">11029</th>
                  <td>Cambio de Equipo</td>
                  <td>Se le cambio el compresor a 2092019029</td>
                  <td>20/20/2000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        `;

        document.getElementById('closeDetalleEquipos').addEventListener('click',()=>{
          detalleEquipos.classList.remove('show-ventana')
        })

      }
      
      showDataEquipos(contID.ID)

      // const equipo = arregloSocios.filter(s => s.id_asociado == contID.ID)[0]

      // if(equipo.estado === 0){
      //   const botonAsociarEquipo = document.querySelector(".EA-btnAsociar");
      //   botonAsociarEquipo.addEventListener("click",()=>{
      //     ipc.send("openAsigEquipoWin")
      //   })
      // }else{
      //   const btnSeeDetails = document.querySelector('.subBox-actions-verDetalles')
      //   const btnCambiarEquipo = document.querySelector('.subBox-actions-cambiar')
      // }

    })

  }

}