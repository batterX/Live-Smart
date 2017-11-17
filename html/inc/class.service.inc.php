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
		$statement = null;
		
		$VarName = null;
		$entity = null;
		$mode = null;
		$S1 = null;
		
		// Fill Variables
		if(isset($_POST['pin'])) $pin = $_POST['pin'];
		if(isset($_POST['active'])) $active = $_POST['active'];
		if(isset($_POST['statement'])) $statement = $_POST['statement'];
		
		if($pin == null || $pin == '') return FALSE;
		
		if($pin[0] == 'o') $VarName = 'BxOutPin';
		else if($pin[0] == 'i') $VarName = 'BxInPin';
		else return FALSE;
		
		$entity = substr($pin, -1);
		
		if($active != null && $active != '') $mode = $active;
		else $mode = '0';
				
		if($statement != null && $statement != '') $S1 = $statement;
		else { $mode = '0'; $S1 = ''; }
		
		// Build SQL String
		$sql = "";
		
		if($mode == 0 || $S1 == '')
			$sql = "REPLACE INTO `Settings` (`VarName`, `entity`, `mode`, `UpDateTime`) 
					VALUES('" . $VarName . "', " . $entity . ", 0, CURRENT_TIMESTAMP)";
		else
			$sql = "REPLACE INTO `Settings` (`VarName`, `entity`, `mode`, `S1`, `UpDateTime`)
					VALUES('" . $VarName . "', " . $entity . ", " . $mode . ", '" . $S1 . "', CURRENT_TIMESTAMP)";
		
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
