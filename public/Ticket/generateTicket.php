<?php
ob_start();
session_start();

require('../../fpdf/fpdf.php');


$dni    = '30816062';
$evento = 3;
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
$pdf->Image($file,1,35,24);
$pdf->Image('../images/entrada-14feb.png',1,2,160);
$pdf->Output('','ticket_'.$dni.'.pdf', true);