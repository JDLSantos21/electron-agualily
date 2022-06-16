

const btnDisponibilidad = document.getElementById('btnDisponibilidad');
const goRegButton = document.getElementById('goRegButton');
const gDisponibles = document.getElementById('gDisponibles');
const gGastados = document.getElementById('gGastados');
const inputDispReset = document.getElementById('inputDispReset');

const dispContainer = document.getElementById('dispContainer');

btnDisponibilidad.addEventListener("click",()=>{
  
  dispContainer.classList.toggle('dispDesplegado');

})

goRegButton.addEventListener("click",()=>{
  
  dispContainer.classList.toggle('dispDesplegado');

})


document.addEventListener("DOMContentLoaded",()=>{
  ipc.send("dispNow");
})

ipc.on('disponibilidad',(event,results)=>{
  gDisponibles.textContent = `${results[0].Disponible}`;
  gGastados.textContent = `${results[0].Gastado}`;

})

btnDispReset.addEventListener('click',(e)=>{
  e.preventDefault();

  dispPass = inputDispReset.value;
  if(dispPass === 'Santos021'){
      ipc.send('resetDisp');
      Swal.fire({
        title:'Reinicio Satisfactorio',
        text:'¡Se ha reiniciado la Disponibilidad!',
        icon:'success',
        timer:5000
       })

       inputDispReset.value = ''

      ipc.send('dispNow');  //pidiendo datos para actualizar.
      
  }else{
    Swal.fire({
      title:'¡Contraseña Incorrecta!',
      icon:'error',
      timer:5000
     })
  }

})



