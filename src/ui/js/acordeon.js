

setInterval(()=>{
  const acordeonItem = document.querySelectorAll('.acordeon--item')
  const acordeonTitle = document.querySelectorAll('.acordeon--title')
  const acordeonContent = document.querySelectorAll('.acordeon--content')
  
  let alturaCont = 0;
  
  acordeonTitle.forEach((allTitles, i)=>{
    acordeonTitle[i].addEventListener('click',function(){
      
       for(let i =0;i < acordeonContent.length;i++){
         acordeonContent[i].removeAttribute('style');
       }
  
      const contenedorData = this.nextElementSibling;  
      const height = contenedorData.scrollHeight;
      contenedorData.style.height = height + 'px';
      acordeonTitle[i].classList.add('active')    
  
    })

  })

},500)