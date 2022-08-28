const sideBarBtn = document.getElementById('sideBarBtn');

const sidebar = document.getElementById('sidebar');
const formContent = document.getElementById('formContent');
const despachoContainer = document.getElementById('despachoContainer');
const asociadosContainer = document.getElementById('asociadosContainer');
const siderBarLinks = document.querySelectorAll(".sidebar-link")

sideBarBtn.addEventListener('click',()=>{
  sidebar.classList.toggle('sidebarActive');
  dispContainer.classList.toggle('activetopbar');
  formContent.classList.toggle('activetopbar');
  incidenciasContainer.classList.toggle('activetopbar');
  despachoContainer.classList.toggle('activetopbar');
  asociadosContainer.classList.toggle('activetopbar'); 
})


siderBarLinks.forEach((allLinks, i)=>{
  siderBarLinks[i].addEventListener("click",function(){
    for (let b = 0; b < siderBarLinks.length; b++) {
      siderBarLinks[b].removeAttribute("style")
    }
    siderBarLinks[i].style.background = "#E6F3FF"
    siderBarLinks[i].style.color = "#0d6efd"
  })

})