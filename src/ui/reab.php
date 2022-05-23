<?php
require_once 'views/head.php'
?>

<body>
    
<?php
require_once 'views/menu.php'
?>

<main class="reab">

<div class="form-content_reab">

    <form action="enviarnaob.php" class="form-reab" method="POST">

        <div class="form-floating mb-3 inputs-disp-container">
            <input type="text" name="reabcantidad" class="form-control" id="floatingInput" required placeholder="name@example.com" >
            <label for="floatingInput">Cantidad Recibida en Galones</label>
        </div>

        <div class="form-floating mb-3 inputs-disp-container">
            <input type="datetime-local" name="reabfecha" id="reabfecha" required class="form-control">
            <label for="floatingInput">Fecha</label>
        </div>
        
        <div class="form-floating mb-3 inputs-disp-container">
            <input type="text" name="reabfirma" class="form-control" id="floatingInput" required placeholder="name@example.com" >
            <label for="floatingInput">Nombre Recibidor</label>
        </div>

        <div class="form-floating mb-3 inputs-disp-container">
            <input type="password" name="reabpass" class="form-control" id="floatingInput" required placeholder="name@example.com" >
            <label for="floatingInput">Contraseña</label>
        </div>
        
        <div class="btns-reab">
        <input type="submit" name="reabregistro" value="Registrar" class="btn btn-success">
        <input type="reset" name="reabreset" value="Limpiar" class="btn btn-warning"> 
        </div>
    </form>         
</div>

<div class="information">

<h1 class="reab-title">Información de Disponibilidad</h1>

    <div class="disp-content shadow-lg p-3 mb-5 rounded">

        <h3 class="disponible ">Galones Disponibles:</h3>
        <div class="disp-result shadow p-3 mb-5 bg-body rounded">

        </div>

        <h3 class="gastado">Galones Consumidos:</h3>
        <div class="gast-result shadow p-3 mb-5 bg-body rounded">

        </div>

        <form action="reab.php" method="POST" class="treset-form">
        
        <div class="input-pass_reab form-floating mb-3">
            <input type="password" name="pass" class="form-control" id="floatingInput" required placeholder="name@example.com" >
            <label for="floatingInput">Contraseña</label>
        </div>
        <input type="submit" name="treset" value="Resetear" class="btn btn-danger" id="Treset">
        </form>

    </div>

</div>

</main>

<script language="javascript">

const menuBar = document.getElementById('menu-bar');
const menu = document.getElementById('menu');

menuBar.addEventListener('click', ()=>{

menuBar.classList.toggle('active');
menuBar.classList.toggle('bars-rotate');

menu.classList.toggle('active');

})

</script>
<script src="js/menu.js"></script>

</body>