<?php
    header('Content-Type: application/json');
    $req = json_decode(file_get_contents('php://input'), true);

    $email    = $req['email'];
    $evento   = $req['evento'];
    $dni      = $req['dni'];
    $username = strstr($email, '@', true); //"username"
    $data     = $req['qr'];

    $file = $evento.'_'.$dni;
    if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
        $data = substr($data, strpos($data, ',') + 1);
        $type = strtolower($type[1]); // jpg, png, gif

        if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
            throw new \Exception('invalid image type');
        }
        $data = str_replace( ' ', '+', $data );
        $data = base64_decode($data);

        if ($data === false) {
            throw new \Exception('base64_decode failed');
        }
    } else {
        throw new \Exception('did not match data URI with image data');
    }

    file_put_contents( $file.".{$type}", $data);
    echo 1;
    exit();
?>