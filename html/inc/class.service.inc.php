<?php

/*
	Handles service options from SQLite database
	
	* setLabels()
	* getLabels()
	
	* setOutputConfig()
	* getOutputConfig()
	
	* setCloudLogging()
	* getCloudLogging()
	
	* setCommandConfig()
	* getCommandConfig()
	
	@author Ivan Gavrilov
*/

class BatterXService
{
	public function __construct() {}
	
	
	
	public function setLabels() 
	{
		if(!(
			isset($_POST['out1']) &&
			isset($_POST['out2']) &&
			isset($_POST['out3']) &&
			isset($_POST['out4']) &&
			isset($_POST['in1']) &&
			isset($_POST['in2']) &&
			isset($_POST['in3']) &&
			isset($_POST['in4']) &&
			isset($_POST['switch1']) &&
			isset($_POST['switch2']) &&
			isset($_POST['switch3']) &&
			isset($_POST['switch4'])
		)) return FALSE;
		
		// Connect to Database
		$db = new PDO('sqlite:/srv/bx/usv.db3');
		
		$sql = "REPLACE INTO `Settings` (`VarName`, `entity`, `Name`, `InUse`, `Mode`, `V1`, `V2`, `V3`, `V4`, `V5`, `V6`, `S1`, `S2`, `UpDateTime`)
				VALUES (
					'BxOutPin',
					1,
					'" . $_POST['out1'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=1),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=1),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=1),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=1),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=1),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=1),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=1),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=1),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=1),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=1),
					CURRENT_TIMESTAMP
				), (
					'BxOutPin',
					2,
					'" . $_POST['out2'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=2),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=2),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=2),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=2),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=2),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=2),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=2),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=2),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=2),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=2),
					CURRENT_TIMESTAMP
				), (
					'BxOutPin',
					3,
					'" . $_POST['out3'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=3),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=3),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=3),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=3),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=3),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=3),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=3),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=3),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=3),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=3),
					CURRENT_TIMESTAMP
				), (
					'BxOutPin',
					4,
					'" . $_POST['out4'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=4),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=4),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=4),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=4),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=4),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=4),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=4),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=4),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=4),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=4),
					CURRENT_TIMESTAMP
				), (
					'BxInPin',
					1,
					'" . $_POST['in1'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=1),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=1),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=1),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=1),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=1),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=1),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=1),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=1),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=1),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=1),
					CURRENT_TIMESTAMP
				), (
					'BxInPin',
					2,
					'" . $_POST['in2'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=2),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=2),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=2),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=2),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=2),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=2),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=2),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=2),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=2),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=2),
					CURRENT_TIMESTAMP
				), (
					'BxInPin',
					3,
					'" . $_POST['in3'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=3),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=3),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=3),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=3),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=3),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=3),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=3),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=3),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=3),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=3),
					CURRENT_TIMESTAMP
				), (
					'BxInPin',
					4,
					'" . $_POST['in4'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=4),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=4),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=4),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=4),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=4),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=4),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=4),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=4),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=4),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='BxInPin' AND `entity`=4),
					CURRENT_TIMESTAMP
				), (
					'Switch',
					1,
					'" . $_POST['switch1'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=1),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=1),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=1),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=1),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=1),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=1),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=1),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=1),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=1),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=1),
					CURRENT_TIMESTAMP
				), (
					'Switch',
					2,
					'" . $_POST['switch2'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=2),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=2),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=2),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=2),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=2),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=2),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=2),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=2),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=2),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=2),
					CURRENT_TIMESTAMP
				), (
					'Switch',
					3,
					'" . $_POST['switch3'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=3),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=3),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=3),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=3),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=3),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=3),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=3),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=3),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=3),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=3),
					CURRENT_TIMESTAMP
				), (
					'Switch',
					4,
					'" . $_POST['switch4'] . "',
					(SELECT `InUse` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=4),
					(SELECT `Mode` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=4),
					(SELECT `V1` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=4),
					(SELECT `V2` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=4),
					(SELECT `V3` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=4),
					(SELECT `V4` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=4),
					(SELECT `V5` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=4),
					(SELECT `V6` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=4),
					(SELECT `S1` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=4),
					(SELECT `S2` FROM `Settings` WHERE `VarName`='Switch' AND `entity`=4),
					CURRENT_TIMESTAMP
				)";
		
		// Insert To Database
		try {
			$stmt = $db->prepare($sql);
			$stmt->execute();
			if($stmt->rowCount() > 0)
				return TRUE;
			$stmt->closeCursor();
		} catch(PDOException $e) {}
		
		return FALSE;
	}
	
	public function getLabels()
	{
		// Connect to Database
		$db = new PDO('sqlite:/srv/bx/usv.db3');
		
		$result = $db->query("SELECT `VarName`, `entity`, `Name` FROM `Settings` WHERE `VarName`='BxOutPin' OR `VarName`='BxInPin' OR `VarName`='Switch'");
		
		$dbh = new stdClass();
		
		foreach($result as $row) {
			$VarName = (string) $row['VarName'];
			$entity = (string) $row['entity'];
			if(!isset($dbh->$VarName))
				$dbh->VarName = new stdClass();
			$dbh->$VarName->$entity = $row['Name'];
		}
		
		return json_encode($dbh, JSON_FORCE_OBJECT);
	}
	
	
	
	public function setOutputConfig()
	{
		// Connect to Database
		$db = new PDO('sqlite:/srv/bx/usv.db3');
		
		// Declare all needed variables
		$entity = null;
		$mode = null;
		$V5 = null;
		$V6 = null;
		$S1 = null;
		
		// Fill Variables
		if(isset($_POST['entity'])) $entity = $_POST['entity']; // 1|2|3|4
		if(isset($_POST['mode'])) $mode = $_POST['mode']; // 0=disabled 1=enabled
		if(isset($_POST['V5'])) $V5 = $_POST['V5']; // off-delay
		if(isset($_POST['V6'])) $V6 = $_POST['V6']; // on-delay
		if(isset($_POST['S1'])) $S1 = $_POST['S1']; // statement
		
		if($mode == null) $mode = 0;
		if($V5 == null || $V5 == "") $V5 = 0;
		if($V6 == null || $V6 == "") $V6 = 0;
		if($statement == null) $statement = "";
		
		// Build SQL String
		$sql = "REPLACE INTO `Settings` (`VarName`, `entity`, `Name`, `InUse`, `Mode`, `V1`, `V2`, `V3`, `V4`, `V5`, `V6`, `S1`, `S2`, `UpDateTime`)
				VALUES (
					'BxOutPin',
					" . $entity . ",
					(SELECT `Name` FROM `Settings` WHERE `VarName`='BxOutPin' AND `entity`=" . $entity . "),
					1,
					" . $mode . ",
					0,
					0,
					0,
					0,
					" . $V5 . ",
					" . $V6 . ",
					'" . $S1 . "',
					'',
					CURRENT_TIMESTAMP
				)";
		
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
	
	public function getOutputConfig()
	{
		// Connect to Database
		$db = new PDO('sqlite:/srv/bx/usv.db3');
		
		$entity = null;
		
		if(isset($_POST['entity'])) $entity = $_POST['entity'];
		
		if($entity == null) return FALSE;
		
		$sql = "SELECT * FROM `Settings` WHERE `VarName` = 'BxOutPin' AND `entity` = " . strval($entity);
		
		$result = $db->query($sql);
		
		$dbh = $result->fetch();
		
		return json_encode($dbh, JSON_FORCE_OBJECT);
	}
	
	
	
	public function setCloudLogging()
	{
		// Connect to Database
		$db = new PDO('sqlite:/srv/bx/usv.db3');
		
		// Declare all needed variables
		$mode = null;
		
		// Fill Variables
		if(isset($_POST['mode'])) $mode = $_POST['mode']; // 0=disabled 1=enabled
		
		if($mode != 0 && $mode != 1) $mode = 1;
		
		// Build SQL String
		$sql = "REPLACE INTO `Settings` (`VarName`, `entity`, `Mode`, `UpDateTime`) 
				VALUES ('CloudLogging', 0, " . $mode . ", CURRENT_TIMESTAMP)";
		
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
	
	public function getCloudLogging()
	{
		// Connect to Database
		$db = new PDO('sqlite:/srv/bx/usv.db3');
		
		$sql = "SELECT * FROM `Settings` WHERE `VarName` = 'CloudLogging' AND `entity` = 0";
		
		$result = $db->query($sql);
		
		$dbh = $result->fetch();
		
		return json_encode($dbh, JSON_FORCE_OBJECT);
	}
	
	
	
	public function setCommandConfig()
	{
		// Connect to Database
		$db = new PDO('sqlite:/srv/bx/usv.db3');
		
		// Declare all needed variables
		$VarName = null;
		$mode = null;
		$V5 = null;
		$V6 = null;
		$S1 = null;
		
		// Fill Variables
		if(isset($_POST['VarName'])) $VarName = $_POST['VarName']; // GridInjection | BatteryCharging | BatteryChargingAC
		if(isset($_POST['mode'])) $mode = $_POST['mode']; // 0=disabled 1=enabled
		if(isset($_POST['V5'])) $V5 = $_POST['V5']; // off-delay
		if(isset($_POST['V6'])) $V6 = $_POST['V6']; // on-delay
		if(isset($_POST['S1'])) $S1 = $_POST['S1']; // statement
		
		if($mode == null) $mode = 0;
		if($V5 == null || $V5 == "") $V5 = 0;
		if($V6 == null || $V6 == "") $V6 = 0;
		if($statement == null) $statement = "";
		
		// Build SQL String
		$sql = "REPLACE INTO `Settings` (`VarName`, `entity`, `Name`, `InUse`, `Mode`, `V1`, `V2`, `V3`, `V4`, `V5`, `V6`, `S1`, `S2`, `UpDateTime`)
				VALUES (
					'" . $VarName . "',
					0,
					'',
					1,
					" . $mode . ",
					0,
					0,
					0,
					0,
					" . $V5 . ",
					" . $V6 . ",
					'" . $S1 . "',
					'',
					CURRENT_TIMESTAMP
				)";
		
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
	
	public function getCommandConfig()
	{
		// Connect to Database
		$db = new PDO('sqlite:/srv/bx/usv.db3');
		
		$VarName = null;
		
		if(isset($_POST['VarName'])) $VarName = $_POST['VarName'];
		
		if($VarName == null || $VarName == "") return FALSE;
		
		$sql = "SELECT * FROM `Settings` WHERE `VarName` = '" . strval($VarName) . "' AND `entity` = 0";
		
		$result = $db->query($sql);
		
		$dbh = $result->fetch();
		
		return json_encode($dbh, JSON_FORCE_OBJECT);
	}
}
