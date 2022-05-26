let moment = require('moment'); // require
moment.locale('es');


sidebarDespacho.addEventListener('click',()=>{
  despachoContainer.classList.add('containerDesplegado')
  incidenciasContainer.classList.remove('showIncContainer')
  localStorage.setItem('IncPage-activa','false');

  if(despachoContainer.classList.contains('containerDesplegado')){
    localStorage.setItem('despPage-activa','true');
  }else{
    localStorage.setItem('despPage-activa','false');
  }

})

if(localStorage.getItem('despPage-activa') === 'true'){
  despachoContainer.classList.add('containerDesplegado')
}else{
  despachoContainer.classList.remove('containerDesplegado')
}

const selectProducts = document.getElementById('selectProducts');
const btnAddProduct = document.getElementById('btnAddProduct');
const productCantidad = document.getElementById('regP-cantidad');
const tBodyPedidos = document.getElementById('tBodyPedidos');
const btnRegPedido = document.getElementById('btnRegPedido');
const btnResetPedido = document.getElementById('regPedidoReset');
const rpCliente = document.getElementById('regP-cliente');
const rpDireccion = document.getElementById('regP-direccion');
const rpFecha = document.getElementById('regP-fecha');
const acordeon = document.getElementById('acordeon');

//INSERTANDO OPTIONS AL SELECT DE PRODUCTOS
document.addEventListener("DOMContentLoaded",()=>{
  ipc.send('activeCallProducts')
  ipc.send('loadPedidos')
  ipc.send('loadPedidosProduts')
})

ipc.on('productos', (event,productos)=>{

  let producstHTML = ''
  let productList = productos

  productList.forEach(producto => {
    producstHTML+= `
    <option value="${producto.ID}">${producto.nombre}</option>
    `
  });

  selectProducts.innerHTML = producstHTML

  //Listado Productos

})

let pedidosArray = []
let activadorPedido = 0

btnAddProduct.addEventListener('click',(e)=>{
  e.preventDefault()

  
  if(productCantidad.value !== "" && productCantidad.value !== "0"){

    activadorPedido = 0
    
    pedidosArray.forEach(pedidoA => {
      if(pedidoA.productoID == selectProducts.value){
        pedidoA.cantidad = parseInt(pedidoA.cantidad) + parseInt(productCantidad.value)
        productCantidad.value = ""
        activadorPedido += 1
      }

    });
    
    if(activadorPedido > 0){
      console.log(activadorPedido,"Es un producto igual.")
    }else{
      function crearObjetoPedido() {
        console.log(activadorPedido,"Producto no es igual")
        let pedidoObj = {
          productoID:selectProducts.value,
          productoName:selectProducts[selectProducts.value - 1].textContent,
          cantidad:productCantidad.value,
          cliente:rpCliente.value,
          direccion:rpDireccion.value,
          fecha:rpFecha.value
        }
        pedidosArray.push(pedidoObj)
        productCantidad.value = ''
      }
  
      crearObjetoPedido()
    }

      

  }else if(productCantidad.value == "0"){
    Swal.fire({
      title:'¡Cantidad no valida!',
      icon:'error',
      timer:5000
     })
  }else{
    Swal.fire({
      title:'¡Tienes que añadir una cantidad!',
      icon:'error',
      timer:5000
     })
  }


  let insertPedido = ''
  
  pedidosArray.map((producto)=>{

    producto.cantidad = parseInt(producto.cantidad);
    
    insertPedido += `
    <tr class="tr-pedidos">
    <td class="td-pedidos">${producto.productoName}</td>
    <td class="td-pedidos">${producto.cantidad}</td>
    </tr>
    `

  })

  tBodyPedidos.innerHTML = insertPedido;

})

btnRegPedido.addEventListener("click",(e)=>{
  e.preventDefault()

  if(pedidosArray.length === 0){
    Swal.fire({
      title:'¡No has añadido un producto!',
      icon:'warning',
      timer:5000
     })
  }else if(rpCliente.value === '' || rpDireccion.value === '' || rpFecha.value === ''){
    Swal.fire({
      title:'¡No puedes dejar campos vacios!',
      icon:'warning',
      timer:5000
     })
  }else{
    ipc.invoke("pedidoProducts",pedidosArray)
    rpCliente.value = ''
    rpDireccion.value = ''
    rpFecha.value = ''
    pedidosArray = []
    tBodyPedidos.innerHTML = "";
    ipc.send('loadPedidos')
    ipc.send('loadPedidosProduts')
  }


})

btnResetPedido.addEventListener("click",()=>{
   pedidosArray = []
   tBodyPedidos.innerHTML = "";
})

ipc.on('dataPedidosProducts',async (event,dataProducts)=>{

  ipc.send('loadPedidos')

  ipc.on('dataPedidos',(event,dataPedidos)=>{

    let showProductsData = ''
    let showPedido = '';
    
    dataPedidos.map((pedido) => {

      let fecha = moment(pedido.fecha);
      for(let i = 0; i < dataProducts.length; i++){
  
        if(dataProducts[i].id_pedido === pedido.ID){
          showProductsData += `
          <tr class="tr-pedidos--show">
            <td class="td-pedidos--show">${dataProducts[i].name_product}</td>
            <td>${dataProducts[i].cantidad}</td>
          </tr>
          `
        }
      }

        showPedido += `
        
        <div class="acordeon--item">
           <div class = "acordeon--title">
            <h2 class = 'acordeon-title-full'>${pedido.cliente}</h2>
            <p class = 'acordeon--timeago'>${moment(fecha).startOf('second').fromNow()}<p>
            ${pedido.estado == 1 ? `<p class = 'acordeon--estado'>Estado: <span class='acordeon--estado-1'>En Proceso...</span><p>` : `<p class = 'acordeon--estado'>Estado: <span class='acordeon--estado-0'>Completado</span><p>`}
           </div>
           
           <div class="acordeon--content">
             <div class="cliente-data--pedido">
               <p class="sub-title">Pedido: <span class="data">${pedido.ID}</span></p>
               <p class="sub-title">Cliente: <span class="data">${pedido.cliente}</span></p>
               <p class="sub-title">Fecha y Hora: <span class="data">${fecha.format('dddd Do MMMM YYYY, h:mm:ss a.')}</span></p>
               <p class="sub-title">Dirección: <span class="data">${pedido.direccion}</span></p>
               ${pedido.estado == 1 ? `<button class='finishP-btn' id='${pedido.ID}'>Terminar Pedido</button>` : ``}
               <table class="table-show--pedidos">
                 <thead>
                   <th class="th-pedidos--show">Producto</th>
                   <th class="th-pedidos--show">Cantidad</th>
                 </thead>
                 <tbody id="showPedidos-tBody">
                  ${showProductsData}
                 </body>
               </table>
             </div>
           </div>
         
         </div> 
         ` 
        showProductsData = ''

       
    })
        acordeon.innerHTML = showPedido;  
  })

})


setInterval(()=>{
  const pedidoStateUpdate = document.querySelectorAll('.finishP-btn')
  for(let i=0;i<pedidoStateUpdate.length;i++){
    pedidoStateUpdate[i].addEventListener("click",()=>{
      let upBtn = pedidoStateUpdate[i].id;
      let upBtnID = upBtn;
        const btnStateID = {
          ID:upBtnID,
        }

        Swal.fire({
          title: 'Finalizar Pedido?',
          text: "¡Cuidado! Este cambio es permanente!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Si, Finalizar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {

            ipc.invoke('finishStatePedido',btnStateID);
            ipc.send('loadPedidos')
            console.log(upBtnID)

            Swal.fire(
              'Pedido Completado!',
              'Estado del Pedido Actualizado',
              'success'
            )
          }
        })

        
    })
  }
},2000) //set interval para que al seleccionar los botones puestos pos innerHTML esten antes de pedir la declaracion.




