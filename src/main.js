const {BrowserWindow, ipcMain, Notification} = require('electron');
const { Connection } = require('promise-mysql');
const {getConnection} = require('./database');

ipc = ipcMain
/*----------INSERTAR DATOS COMBUSTIBLE---------*/

ipc.handle("add",(event,obj)=>{
  addRegister(obj)
})

async function addRegister(obj){

  const conn = await getConnection();

  obj.kilometraje = parseInt(obj.kilometraje)
  obj.galones = parseFloat(obj.galones)

  const result = await conn.query('INSERT INTO combustible SET ?', obj)
  await conn.query(`UPDATE disponibilidad Set Gastado = Gastado + '${obj.galones}' WHERE ID=1`)
  await conn.query(`UPDATE disponibilidad Set Disponible = Disponible - '${obj.galones}' WHERE ID=1`)

  console.log(result);
  console.log(obj)

  new Notification ({
    title: 'Agua Lily Gestión',
    body: 'Consumo Registrado'
  }).show();

}

/*------------------------------------------------------------------*/

/*----------INSERTAR DATOS REABASTECIMIENTO---------*/

ipc.handle("addReab",(event,obj)=>{
  addReab(obj)
})

async function addReab(obj){

  const conn = await getConnection();

  obj.Galones = parseInt(obj.Galones)

   await conn.query(`INSERT INTO reabastecimiento SET ?`, obj)
   await conn.query(`UPDATE disponibilidad Set Disponible = Disponible + '${obj.Galones}' WHERE ID=1`)

  console.log(obj)

  new Notification ({
    title: 'Agua Lily Gestión',
    body: 'Reabastecimiento Registrado'
  }).show();

}



/*----------REALIZANDO CONSULTA DE COMBUSTIBLE---------*/


///////////////////////CONSULTA TOTAL/////////////////////////
ipc.on("allConsultData", async()=>{
  const conn = await getConnection();
  conn.query(`SELECT * FROM combustible ORDER BY fecha DESC`,(error,results,fields)=>{
    child.webContents.send('registrosTotal',results);
    });
})
////////////////////////////////////////////////////////////////


ipc.handle('getReg',(event,filterData)=>{
  consultaCombustible(filterData);
})

  async function consultaCombustible(filterData){
    const conn = await getConnection();

    const querysConsulta = {
      allData:`SELECT * FROM combustible ORDER BY fecha DESC`,
      soloFicha: `SELECT * FROM combustible WHERE Ficha = ${filterData.ficha} ORDER BY fecha DESC`,
      todoLleno: `SELECT * FROM combustible WHERE ficha = ${filterData.ficha} AND fecha BETWEEN '${filterData.firstDate}' AND '${filterData.lastDate}' ORDER BY fecha DESC`,
      soloFecha: `SELECT * FROM combustible WHERE fecha BETWEEN '${filterData.firstDate}' AND '${filterData.lastDate}' ORDER BY fecha DESC`
    }

    if(filterData.firstDate && filterData.lastDate != ''){

      if(filterData.ficha != ''){
        console.log('todo lleno')
        conn.query(querysConsulta.todoLleno,(error,results,fields)=>{
        child.webContents.send('registros',results);
        });
  
     }else{
      console.log('solo fecha')
      conn.query(querysConsulta.soloFecha,(error,results,fields)=>{
      child.webContents.send('registros',results);
      });
     }

    }else{
      console.log('solo ficha')
      conn.query(querysConsulta.soloFicha,(error,results,fields)=>{
      child.webContents.send('registros',results);
      });

    }
  }


/*---------------------------------------------------------------------------*/

/*----------MOSTRANDO DISPONIBILIDAD---------*/

async function getDisponibilidad(){
  const conn = await getConnection();
  ipc.on('dispNow',()=>{
    conn.query('SELECT * FROM Disponibilidad WHERE ID=1',(error,results,fields)=>{
      window.webContents.send('disponibilidad',results);
    })
  })
}
getDisponibilidad();

/*---------------------------------------------------------------------------*/

ipc.on('resetDisp', async ()=>{
    const conn = await getConnection();
    conn.query('UPDATE disponibilidad Set Disponible = 0, Gastado = 0 WHERE ID=1');
  })

/*----------INSERTAR DATOS INCIDENCIAS---------*/

ipc.handle('addIncidencia',(event,obj)=>{
  
  obj.asignado = obj.asignado.toLowerCase()

  regIncidencia(obj);
})

async function regIncidencia(obj){

  const conn = await getConnection();

  obj.prioridad = parseInt(obj.prioridad)

  await conn.query('INSERT INTO incidencias SET ?',obj)

  await conn.query(`SELECT * FROM personalreparacion`,(error,results,fields)=>{

    let asignadosregistrados = [];
    for(let i=0;i<results.length; i++){
      asignadosregistrados.push(results[i].nombre);
    }

    console.log(asignadosregistrados);
    
     if(asignadosregistrados.includes(obj.asignado)){
         console.log('existe el nombre')
         conn.query(`UPDATE personalreparacion SET abierto = abierto + 1 WHERE nombre="${obj.asignado}"`)
         window.reload();
     }else{
         console.log('No existe el nombre')
         let newpersonalreparacion = {
           nombre:obj.asignado,
           abierto:1,
           resuelto:0
         }
         conn.query(`INSERT INTO personalreparacion SET ?`,newpersonalreparacion);
         window.reload();
     }

  });


  new Notification ({
    title:'Gestión Incidencias',
    body:'Incidencia Registrada Satisfactoriamente'
  }).show();

}


/*----------ACTUALIZAR DATOS INCIDENCIAS---------*/

ipc.handle('addUpdtIncidencia',(event,obj)=>{
  updIncidencia(obj);
})

async function updIncidencia(obj){
  const conn = await getConnection();

  await conn.query(`SELECT fechareg,asignado FROM incidencias WHERE ID = ${obj.ID}`,async (error,data,fields)=>{
    let fechareg = new Date(data[0].fechareg).getTime()
    let fechares = new Date(obj.fechares).getTime()
    let fechaDiff = fechares - fechareg
    let tiempores = Math.ceil(fechaDiff/(1000*60*60*24))
    await conn.query(`UPDATE incidencias set fechares = '${obj.fechares}', tiempores = '${tiempores}', comentario = '${obj.comentario}',estado = 0 WHERE ID=${obj.ID}`)
    await conn.query(`UPDATE personalreparacion set resuelto = resuelto + 1,abierto = abierto - 1 WHERE nombre='${data[0].asignado}'`)
    window.reload();
  })
  

}
/*---------------------------------------------------------------------------*/
/*----------CONSULTA DATOS INCIDENCIAS---------*/

ipc.on('getIncidencias', async()=>{
  const conn = await getConnection();
  conn.query(`SELECT * FROM incidencias`,(error,results,fields)=>{
    window.webContents.send('dataIncidencias',results);
  })
  
  conn.query(`SELECT * FROM personalreparacion`,(error,results,fields)=>{
     window.webContents.send('dataAsignados',results);
   })
})


/*---------------------------------------------------------------------------*/

/*----------CONSULTA DATOS INCIDENCIAS---------*/

ipc.on('activeCallProducts',async ()=>{
  const conn = await getConnection();
  conn.query(`SELECT * FROM productos`,(error,results,fields)=>{
  window.webContents.send('productos',results);
  })
})

  
ipc.on('getIncidenciasReg', async()=>{
  const conn = await getConnection();
  conn.query(`SELECT * FROM incidencias ORDER BY ID DESC`,(error,results,fields)=>{
    child.webContents.send('dataIncidencias',results);
  })
})


/*----------RECIBIENDO DATOS DE PEDIDO---------*/

ipc.handle("pedidoProducts",async(evt,arrProducts)=>{

  function genID(size) {

    let id = ''

    const caracteres = '0123456789'

    for (let i = 0; i < size; i++) {
      id += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    }

    return id;
  }

  let idPedido = genID(5);
  idPedido = parseInt(idPedido)


  arrProducts.forEach(producto => {

    async function iPedido() {
      
      const conn = await getConnection();
      producto.productoID = parseInt(producto.productoID)
      producto.cantidad = parseInt(producto.cantidad)
    
      conn.query(`INSERT INTO pedido_productos (id_pedido,id_producto,name_product,cantidad) VALUES (${idPedido},${producto.productoID},'${producto.productoName}',${producto.cantidad})`)

    }
      
    iPedido()
      
  });

  async function regPedido() {
    const conn = await getConnection();
    conn.query(`INSERT INTO pedidos VALUES (${idPedido},'${arrProducts[0].cliente}','${arrProducts[0].direccion}','${arrProducts[0].fecha}',2)`)
  }

  regPedido()
})

ipc.on('loadPedidos',async()=>{
  
  const conn = await getConnection();
  conn.query('SELECT * FROM pedidos ORDER BY fecha DESC',(error,results,fields)=>{
    window.webContents.send('dataPedidos',results);
  })

})

ipc.on('loadPedidosProduts',async()=>{
  
  const conn = await getConnection();
  conn.query('SELECT * FROM pedido_productos',(error,results,fields)=>{
    window.webContents.send('dataPedidosProducts',results);
  })

})

//actualizar estado del pedido

ipc.handle('finishStatePedido',async(event,datos)=>{

  let pedidoID = parseInt(datos.ID)

  const conn = await getConnection()

  conn.query(`SELECT estado FROM pedidos WHERE ID=${pedidoID}`,(error,result,fields)=>{
    
    if(result[0].estado == 2){
      conn.query(`UPDATE pedidos SET estado = 1 WHERE ID = ${pedidoID}`)
    }else if(result[0].estado == 1){
      conn.query(`UPDATE pedidos SET estado = 0 WHERE ID = ${pedidoID}`)
    }
  })
  
})


// PIDIENDO DATOS DE SOCIOS

ipc.on("reqAsociadosData", async()=>{
  const conn = await getConnection();
  conn.query(`SELECT * FROM socios ORDER BY asociado_fechareg DESC`,(error,results,fields)=>{
    window.webContents.send('allSociosData',results);
  });

  conn.query(`SELECT * FROM equipos ORDER BY estado DESC`,(error,results,fields)=>{
    window.webContents.send('allEquiposData',results);
  });

})

// AÑADIENDO NUEVO SOCIO

ipc.handle("addNewSocio",async (event,socio)=>{
  const conn = await getConnection();
  await conn.query(`INSERT INTO socios SET ?`, socio)
})

//AÑADIENDO NUEVO EQUIPO Y VALIDANDO SERIAL EXISTENTE

ipc.handle("addNewEquipo",async (event,equipo)=>{
  const conn = await getConnection();
  
  conn.query(`SELECT serial FROM equipos`,async (error,seriales,fields)=>{

    let allSerials = JSON.stringify(seriales)

    if(allSerials.includes(equipo.serial)){
      child.webContents.send('serialExist','si')
    }else{
      child.webContents.send('serialExist','no')
      await conn.query(`INSERT INTO equipos SET ?`, equipo)
    }

  })

})

ipc.on('sendAsigData',async()=>{
  
  conn = await getConnection();
  conn.query(`SELECT * FROM socios WHERE estado = 0`,(error,socios,fields)=>{
    child.webContents.send('dataAsigSocios',socios)
  })
  conn.query(`SELECT * FROM equipos WHERE estado = 0`,(error,equipos,fields)=>{
    child.webContents.send('dataAsigEquipo',equipos)
  })

})

ipc.handle('addNewAsociacion',async(event,asignacion)=>{

  const conn = await getConnection();
  conn.query(`INSERT INTO asociaciones_equipos SET ?`,asignacion)

  conn.query(`UPDATE socios SET equipo_asociado = ${asignacion.asociaciones_idequipo},estado = 1 WHERE id_asociado = ${asignacion.asociaciones_idsocio}`)

  conn.query(`UPDATE equipos SET estado = 1 WHERE id_equipo = ${asignacion.asociaciones_idequipo}`)

})

// mandando datos de movimientos

ipc.on('sendMovesData',async()=>{
  const conn = await getConnection();
  conn.query('SELECT * FROM equipo_moves',(error,moves,fields)=>{
    window.webContents.send('dataMovesEquipos',moves)
  })
})


let window 
let child

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {

  window = new BrowserWindow({
    icon: __dirname + 'icon.ico',
    width:1096,
    height:768,
    minHeight:768,
    minWidth:1096,
    frame:false,
    icon:"icon.ico",
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false,
    }
  })

  window.loadFile('src/ui/index.html');

  //CLOSE BTN

  ipc.on('closeApp',()=>{
    window.close();
  })

  //Maximize BTN

  ipc.on('maxApp',()=>{
    if(window.isMaximized()){
      window.restore();
    }else{
      window.maximize();
    }
  })

  //Minimize BTN

  ipc.on('minApp',()=>{
    window.minimize();
  })

    //VENTANA CONSULTA

  ipc.on("winConsult",()=>{
    child = new BrowserWindow({
      parent:window,
      height:728,
      width:1024,
      minHeight:728,
      minWidth:1024,
      modal:true,
      show:false,
      webPreferences: {
        nodeIntegration:true,
        contextIsolation:false,
        nativeWindowOpen: true
      }});
    
    child.removeMenu();
    child.loadFile('src/ui/consulta.html');
    child.show();

  })

  //VENTANA REGISTRAR INCIDENCIA
  ipc.on("winRegIncidencia",()=>{
    child = new BrowserWindow({
      parent:window,
      height:728,
      width:800,
      minHeight:728,
      minWidth:800,
      modal:true,
      show:false,
      webPreferences: {
        nodeIntegration:true,
        contextIsolation:false,
      }});
    
    child.removeMenu();
    child.loadFile('src/ui/regTicket.html');
    child.show();

  })

  //VENTANA REPORTE REGISTROS DE INCENCIDAS
  ipc.on("winShowAllRegIncidencias",()=>{
    child = new BrowserWindow({
      parent:window,
      height:728,
      width:1280,
      minHeight:728,
      minWidth:1280,
      modal:true,
      show:false,
      webPreferences: {
        nodeIntegration:true,
        contextIsolation:false,
      }});
    
    child.removeMenu();
    child.loadFile('src/ui/cIncidencias.html');
    child.show();

  })

  ipc.on("openSociosWin",()=>{
    child = new BrowserWindow({
      parent:window,
      height:600,
      minHeight:600,
       maxHeight:600,
      width:650,
      minWidth:650,
       maxWidth:650,
      modal:true,
      show:false,
      webPreferences: {
        nodeIntegration:true,
        contextIsolation:false,
      }});
    
     child.removeMenu();
    child.loadFile('src/ui/regSocio.html');
    child.show();

  })

  ipc.on("openAsigEquipoWin",()=>{
    child = new BrowserWindow({
      parent:window,
      height:600,
      minHeight:600,
       maxHeight:600,
      width:650,
      minWidth:650,
       maxWidth:650,
      modal:true,
      show:false,
      webPreferences: {
        nodeIntegration:true,
        contextIsolation:false,
      }});
    
     child.removeMenu();
    child.loadFile('src/ui/asigEquipo.html');
    child.show();

  })

  ipc.on("openEquiposWin",()=>{
    child = new BrowserWindow({
      parent:window,
      height:600,
      minHeight:600,
       maxHeight:600,
      width:650,
      minWidth:650,
       maxWidth:650,
      modal:true,
      show:false,
      webPreferences: {
        nodeIntegration:true,
        contextIsolation:false,
      }});
    
     child.removeMenu();
    child.loadFile('src/ui/regEquipo.html');
    child.show();

  })

}

module.exports = {
  createWindow
}

