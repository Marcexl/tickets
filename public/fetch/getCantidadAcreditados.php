<?php 
$servername = "127.0.0.1";
$username = "30aniversario";
$password = '30ASensei2023';
$dbname = "30aniversario";

$idEvento = $_GET['idEvento'];

$data  = new stdClass();
$conn = new mysqli($servername, $username, $password, $dbname);

if  ($conn->connect_errno) 
{
    echo "Lo sentimos, este sitio web está experimentando problemas.";
    echo "Errno: " . $conn->connect_errno . "\n";
    exit();
}

$sql = "SELECT COUNT(verificado) 
        AS verificados 
        FROM `tickets` 
        WHERE `verificado` = 1 
        AND `id_evento` = $idEvento";
$resultado = $conn->query($sql); 
while ($row = $resultado->fetch_assoc()) 
{
    $verificados = $row['verificados'];
}

$data->verificados = $verificados;
echo json_encode($data);
?>
