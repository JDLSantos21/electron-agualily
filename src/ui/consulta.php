<?php
require_once 'views/head.php';
?>

<body>
    
<?php
require_once 'views/menu.php';
?>
    <main class="main-consulta">

        <h1 class="title">Consultar Registros</h1>

        <div class="box-consult">   

            <form action="consulta.php" method="POST">
            
        <div class="consult-date bg-primary bg-gradient shadow-lg p-3 mb-5 rounded">
            <h4 class="cd-subtitle">Escoger fecha</h4>
            <label for="" class="cd-subtitle">Desde: </label>
            <input class="form-control" type="datetime-local" name="idate" id="idate">
            <label for="" class="cd-subtitle">Hasta: </label>
            <input class="form-control" type="datetime-local" name="fdate" id="fdate">
        </div>
            <div class="form-floating mb-3">
                <input type="text" name="c-ficha" class="form-control input-ficha" id="floatingInput" placeholder="name@example.com">
                <label class="input-ficha" for="floatingInput">Ficha</label>
        </div>
        
            <input class="btn btn-info" type="submit" value="Consultar" name="cBtn">
            <input class="btn btn-success" type="submit" value="Ver todos" name="VAllBtn">
            </form>

        </div>

<div class="table-content" >
   <table class="table table-borderless">
    <tr class="tr">
       <th class="th">Ficha</th>
       <th class="th">Chofer</th>
       <th class="th">Kilometraje</th>
       <th class="th">Galones</th>
       <th class="th">Fecha y Hora</th>
       <th class="th">Registrado por:</th>
       <th class="th">Comentario</th>
    </tr>

<?php

$server = "localhost";
$user = "root";
$pass = "";
$database = "agualily";

$link = mysqli_connect($server, $user, $pass, $database);

if(!$link){
    echo"Error en la conexion con el servidor";
}

// CONSULTA VER TODO

if(isset($_POST['VAllBtn'])){
    $resultado = mysqli_query($link, "SELECT * FROM combustible ORDER BY fecha DESC");

    while($consulta = mysqli_fetch_array($resultado)){
        
        echo"  
            <tr>
    
            <td class=\"td ccFicha\">".$consulta['Ficha']."</td>
            <td class=\"td\">".$consulta['Chofer']."</td>
            <td class=\"td cKilometraje\">".$consulta['Kilometraje']."</td>
            <td class=\"td cGalones\">".$consulta['Galones']."</td>
            <td class=\"td\">".$consulta['Fecha']."</td>
            <td class=\"td\">".$consulta['Firma']."</td>
            <td class=\"td\">".$consulta['Comentario']."</td>
            
            </tr>
            ";
        }
}

// APARTADO CONSULTA MANUAL

if(isset($_POST['cBtn'])){

    error_reporting(0);
    $cFicha = $_POST['c-ficha'];
    $iDate = $_POST['idate'];
    $fDate = $_POST['fdate'];

        if($iDate && $fDate != ''){
       
            if($cFicha != ''){
                $resultado = mysqli_query($link, "SELECT * FROM combustible WHERE ficha = $cFicha AND fecha BETWEEN '$iDate' AND '$fDate' ORDER BY fecha DESC");
    
            } else{
            $resultado = mysqli_query($link, "SELECT * FROM combustible WHERE fecha BETWEEN '$iDate' AND '$fDate' ORDER BY fecha DESC");
            }
            
        }else{
            $resultado = mysqli_query($link, "SELECT * FROM combustible WHERE ficha = $cFicha ORDER BY fecha DESC");
        }
 
    while($consulta = mysqli_fetch_array($resultado)){
        
        


    echo"  
        <tr>

        <td class=\"td ccFicha\">".$consulta['Ficha']."</td>
        <td class=\"td\">".$consulta['Chofer']."</td>
        <td class=\"td\">".$consulta['Kilometraje']."</td>
        <td class=\"td\">".$consulta['Galones']."</td>
        <td class=\"td\">".$consulta['Fecha']."</td>
        <td class=\"td\">".$consulta['Firma']."</td>
        <td class=\"td\">".$consulta['Comentario']."</td>
        
        </tr>
        ";
    }
}
?>
   </table> 
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
<script src="js/cambiarFicha.js"></script>
<script src="js/menu.js"></script>

</body>
</html>