<?php

include_once "../inc/class.service.inc.php";

if(!empty($_POST['action']))
{
	$serviceObj = new BatterXService();
	
	switch($_POST['action'])
	{
		case 'setLabels':
			echo $serviceObj->setLabels();
			break;
			
		case 'getLabels':
			echo $serviceObj->getLabels();
			break;
			
		case 'setOutputConfig':
			echo $serviceObj->setOutputConfig();
			break;
			
		case 'getOutputConfig':
			echo $serviceObj->getOutputConfig();
			break;
			
		case 'setCloudLogging':
			echo $serviceObj->setCloudLogging();
			break;
			
		case 'getCloudLogging':
			echo $serviceObj->getCloudLogging();
			break;
			
		case 'setCommandConfig':
			echo $serviceObj->setCommandConfig();
			break;
			
		case 'getCommandConfig':
			echo $serviceObj->getCommandConfig();
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
