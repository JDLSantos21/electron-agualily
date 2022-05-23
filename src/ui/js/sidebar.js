const sideBarBtn = document.getElementById('sideBarBtn');

const sidebar = document.getElementById('sidebar');
const formContent = document.getElementById('formContent');
const despachoContainer = document.getElementById('despachoContainer');


sideBarBtn.addEventListener('click',()=>{
  sidebar.classList.toggle('sidebarActive');
  dispContainer.classList.toggle('activetopbar');
  formContent.classList.toggle('activetopbar');
  incidenciasContainer.classList.toggle('activetopbar');
  despachoContainer.classList.toggle('activetopbar');
})