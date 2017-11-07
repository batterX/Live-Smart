<?php

/*
	Handles service options from SQLite database
	
	* setPinConfig()
	
	@author Ivan Gavrilov
*/

class BatterXService
{
	public function __construct() {}
	
	public function setPinConfig()
	{
		// Connect to Database
		$db = new PDO('sqlite:/srv/bx/usv.db3');
		
		// Declare all needed variables
		$pin = null;
		$active = null;
		$timeFrom = null;
		$timeTo = null;
		$statement = null;
		
		// Fill Variables
		if(isset($_POST['pin'])) $pin = $_POST['pin'];
		if(isset($_POST['active'])) $active = $_POST['active'];
		if(isset($_POST['timeFrom'])) $timeFrom = $_POST['timeFrom'];
		if(isset($_POST['timeTo'])) $timeTo = $_POST['timeTo'];
		if(isset($_POST['statement'])) $statement = $_POST['statement'];
		
		// Build SQL String
		$sql = "";
		if($active != 1 || $pin == null || $pin == "" || $statement == null || $statement == "")
			$sql = "REPLACE INTO `Settings_GPIO` (`pin`, `active`, `logtime`) VALUES('" . $pin . "', 0, CURRENT_TIMESTAMP)";
		else
			$sql = "REPLACE INTO `Settings_GPIO` (`pin`, `active`, `timeFrom`, `timeTo`, `statement`, `logtime`) 
					VALUES('" . $pin . "'," . $active . ",'" . $timeFrom . "','" . $timeTo . "','" . $statement . "', CURRENT_TIMESTAMP)";
		
		// Insert To Database
		try {
			$stmt = $db->prepare($sql);
			$stmt->execute();
			if($stmt->rowCount() == 1)
				return TRUE;
			$stmt->closeCursor();
		} catch(PDOException $e) {}
		
		return FALSE;
	}
}
