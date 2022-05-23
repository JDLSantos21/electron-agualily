const prioridadIncidencia = document.getElementById('prioridadIncidencia');
const desIncidencia = document.getElementById('desIncidencia');
const asigIncidencia = document.getElementById('asigIncidencia');
const informanteIncidencia = document.getElementById('informanteIncidencia');
const fechaIncidencia = document.getElementById('fechaIncidencia');
const btnRegIncidencia = document.getElementById('btnRegIncidencia');

btnRegIncidencia.addEventListener('click', (e)=>{
  e.preventDefault();

  const newIncidencia = {
    estado:1,
    prioridad:prioridadIncidencia.value,
    descripcion:desIncidencia.value,
    fechareg:fechaIncidencia.value,
    informante:informanteIncidencia.value,
    asignado:asigIncidencia.value,
    comentario:''
  }

  async function registrarIncidencia() {
    await ipc.invoke('addIncidencia',newIncidencia);
  }

  registrarIncidencia();

})