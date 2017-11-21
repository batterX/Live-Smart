<?php

include_once "../inc/class.service.inc.php";

if(!empty($_POST['action']))
{
	$serviceObj = new BatterXService();
	
	switch($_POST['action'])
	{
		case 'setPinConfig':
			echo $serviceObj->setPinConfig();
			break;
			
		case 'getPinConfig':
			echo $serviceObj->getPinConfig();
			break;
		
		default:
			echo "";
			break;
	}
}
else
{
	echo "";
	exit;
}
