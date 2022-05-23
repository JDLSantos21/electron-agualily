closeBtn = document.getElementById('closeBtn');
maxBtn = document.getElementById('maxBtn');
minBtn = document.getElementById('minBtn');


 closeBtn.addEventListener('click',()=>{
   ipc.send('closeApp');
 })

maxBtn.addEventListener('click',()=>{
 ipc.send('maxApp');
})

minBtn.addEventListener('click',()=>{
 ipc.send('minApp');
})



///consult page
