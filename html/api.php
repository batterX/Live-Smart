<?php

if(!empty($_GET['get']))
{	
	switch(strtolower($_GET['get']))
	{
		case 'currentstate':

			if(isset($_GET['type']) && isset($_GET['entity'])) 
			{
				$db = new PDO('sqlite:/srv/bx/ram/currentD.db3');
		
				$result = $db->query('SELECT entityvalue FROM CurrentState WHERE type=' . $_GET['type'] . ' AND entity=' . $_GET['entity'] . ' LIMIT 1');

				$res = $result->fetchColumn();
				
				echo strval($res);
			}
			else
			{
				$db = new PDO('sqlite:/srv/bx/ram/currentD.db3');
		
				$result = $db->query('SELECT type, entity, entityvalue, logtime FROM CurrentState');

				$dbh = new stdClass();

				foreach($result as $row) {
					$type = (string) $row['type'];
					$entity = (string) $row['entity'];
					if(!isset($dbh->$type)) 
						$dbh->$type = new stdClass();
					$dbh->$type->$entity = $row;
				}
				
				echo json_encode($dbh, JSON_FORCE_OBJECT);
			}

			break;


		case 'energydata':

			if(isset($_GET['type']) && isset($_GET['entity'])) 
			{
				// Create Array With IDs (Keys)
				$keys = explode(",", $_GET["type"]);
				
				// Create Array Full with Zeros (Values)
				$values = array_fill(0, count($keys), 0);
				
				// Build the Array -> array(type=>entityvalue, type=>entityvalue, ...)
				$resultArray = array_combine($keys, $values);
				
				// Connect to Database
				$db = new PDO('sqlite:/srv/bx/usv.db3');
				
				// Build SQL String
				$sql = "SELECT type, entityvalue FROM EnergyData WHERE entity=" . $_GET['entity'] . " AND type IN(" . implode(',', $keys) . ") LIMIT " . count($keys);
				
				// Fetch All Rows That Exist
				$result = $db->query($sql);
				
				foreach($result as $row) {
					$resultArray[$row["type"]] = $row["entityvalue"];
				}
				
				echo implode(',', $resultArray);
			}
			else if(isset($_GET['entity']))
			{
				$db = new PDO('sqlite:/srv/bx/usv.db3');
				
				$result = $db->query('SELECT SUM(entityvalue) FROM EnergyData WHERE entity=' . $_GET['entity']);

				$res = $result->fetchColumn();
				
				echo strval($res);
			}
			else
			{
				echo "0";
			}

			break;


		case 'powerdata':

			if(isset($_GET['type']) && isset($_GET['entity'])) {
				// Create Array With IDs (Keys)
				$keys = explode(",", $_GET["type"]);

				// Create Array Full with Zeros (Values)
				$values = array_fill(0, count($keys), 0);
				
				// Build the Array -> array(type=>entityvalue, type=>entityvalue, ...)
				$resultArray = array_combine($keys, $values);
				
				// Connect to Database
				$db = new PDO('sqlite:/srv/bx/usv.db3');
				
				// Build SQL String
				$sql = "SELECT type, entityvalue FROM PowerData WHERE entity=" . $_GET['entity'] . " AND type IN(" . implode(',', $keys) . ") LIMIT " . count($keys);
				
				// Fetch All Rows That Exist
				$result = $db->query($sql);
				
				foreach($result as $row) {
					$resultArray[$row["type"]] = $row["entityvalue"];
				}
				
				echo implode(',', $resultArray);
			}
			else
			{
				echo "0";
			}

			break;


		case 'warningsdata':

			if (isset($_GET['count'])) 
			{
				// Connect to Database
				$db = new PDO('sqlite:/srv/bx/usv.db3');
				
				$result = $db->query("SELECT * FROM (SELECT id, type, entity, entityvalue, logtime FROM WarningsData ORDER BY id DESC LIMIT " . $_GET['count']. ") ORDER BY id ASC");

				$dbh = array();
				
				foreach($result as $r) {
					$dbh[] = $r;
				}
				
				echo json_encode($dbh);
			}
			else
			{
				echo "";
			}

			break;
		
		default:
			echo "";
			break;
	}
}
else if(isset($_GET['set']) && isset($_GET['state'])) 
{
	$state = $_GET['state'];
	
	if($state == '0' || $state == '1' || $state == '2') 
	{
		$db = new PDO('sqlite:/srv/bx/ram/currentC.db3');
		
		$sql = "";
		
		switch(strtolower($_GET['set']))
		{
			case 'switch1':
				$sql = "INSERT INTO `CommandsIn` (`type`, `entity`, `text1`, `text2`) VALUES(20736, 0, '1', '" . $state . "')";
				break;
			case 'switch2':
				$sql = "INSERT INTO `CommandsIn` (`type`, `entity`, `text1`, `text2`) VALUES(20736, 0, '2', '" . $state . "')";
				break;
			case 'switch3':
				$sql = "INSERT INTO `CommandsIn` (`type`, `entity`, `text1`, `text2`) VALUES(20736, 0, '3', '" . $state . "')";
				break;
			case 'switch4':
				$sql = "INSERT INTO `CommandsIn` (`type`, `entity`, `text1`, `text2`) VALUES(20736, 0, '4', '" . $state . "')";
				break;
			default:
				break;
		}
		
		try {
			$stmt = $db->prepare($sql);
			$stmt->execute();
			if($stmt->rowCount() == 1)
				echo '1';
			$stmt->closeCursor();
		} catch(PDOException $e) {}
	}
}
else
{
	echo "";
}