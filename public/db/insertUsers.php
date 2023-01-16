<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$id       = $data['dni'];
$nombre   = $data['nombre'];
$apellido = $data['apellido'];
$dni      = $data['dni'];
$email    = $data['email'];
$celular  = $data['celular'];
$evento   = $data['evento'];
$validado = $data['validado'];

if(file_exists('records.json'))
{
    $final_data = fileWriteAppend($id,$nombre,$apellido,$dni,$email,$celular,$evento,$validado);
    if(file_put_contents('records.json', $final_data))
    {
        $success = true;
        echo $message;
        exit();
    }
    else
    {
        $success = false;
        echo $message;
        exit();
    }
}

function fileWriteAppend($id,$nombre,$apellido,$dni,$email,$celular,$evento,$validado){
    $current_data = file_get_contents('records.json');
    $array_data = json_decode($current_data, true);
    $extra = array(
        'id'        => $id,
        'nombre'    => $nombre,
        'apellido'  => $apellido,
        'dni'       => $dni,
        'email'     => $email,
        'celular'   => $celular,
        'evento'    => $evento,
        'validado'   => $validado
    );
    $array_data[] = $extra;
    $final_data = json_encode($array_data);
    return $final_data;
}

?>