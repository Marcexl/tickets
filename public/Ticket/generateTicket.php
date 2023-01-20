<?php
ob_start();
session_start();

require('../../fpdf/fpdf.php');
header('Content-Type: application/json');
$req = json_decode(file_get_contents('php://input'), true);

$dni    = $req['dni'];
$evento = $req['evento'];
$file   = $evento.'_'.$dni.'.png';

class PDF extends FPDF
{
	// Cabecera de página
	function Header()
    {

    }
	function Footer()
	{

    }	
}

// Creación del objeto de la clase heredada
$pdf = new PDF('L','mm',array(162,62));
$pdf->AliasNbPages();
$pdf->AddPage();

// Logo
$pdf->Image('../Generate/'.$file,1,35,24);
$pdf->Image('../images/entrada-platea.png',1,2,160);
$pdf->Output('',$file.'.pdf');