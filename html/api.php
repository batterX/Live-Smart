<?php

if(!empty($_GET['get']))
{	
	switch(strtolower($_GET['get']))
	{
		case 'currentstate':
			
			// Connect to Database
			$db = new PDO('sqlite:/srv/bx/ram/currentD.db3');
			
			// Returns the value with the selected type and entity
			// ?get=currentstate&type=273&entity=1
			if(isset($_GET['type']) && isset($_GET['entity'])) {
				$result = $db->query('SELECT entityvalue FROM CurrentState WHERE type=' . $_GET['type'] . ' AND entity=' . $_GET['entity'] . ' LIMIT 1');
				$res = $result->fetchColumn();
				echo strval($res);
			}
			// Returns the full CurrentState table
			// ?get=currentstate
			else {
				$result = $db->query('SELECT type, entity, entityvalue, logtime FROM CurrentState', PDO::FETCH_ASSOC);
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
			
			if(isset($_GET['entity']))
			{
				// Connect to Database
				$db = new PDO('sqlite:/srv/bx/usv.db3');
				
				// Returns the Total Energy (since first day) in Wh for selected entity
				// ?get=energydata&entity=10
				if(!isset($_GET['type'])) 
				{
					$result = $db->query('SELECT IFNULL(SUM(entityvalue), 0) FROM EnergyData WHERE entity=' . $_GET['entity']);
					$res = $result->fetchColumn();
					echo strval($res);
				} 
				else 
				{
					// Create Array With IDs (Keys)
					$keys = explode(",", $_GET["type"]);
					
					// Returns the Energy in Wh for selected day/s and entity
					// ?get=energydata&type=20180128,20180129&entity=10
					if(strlen($keys[0]) == 8) {
						$values = array_fill(0, count($keys), 0);
						$resultArray = array_combine($keys, $values);
						$sql = "SELECT type, entityvalue FROM EnergyData WHERE entity=" . $_GET['entity'] . " AND type IN(" . implode(',', $keys) . ") LIMIT " . count($keys);
						$result = $db->query($sql);
						foreach($result as $row) { $resultArray[$row["type"]] = $row["entityvalue"]; }
						echo implode(',', $resultArray);
					}
					// Returns the Energy in Wh for selected months and entity
					// ?get=energydata&type=201801&entity=10
					else if(strlen($keys[0]) == 6) {
						$resultStr = "";
						foreach($keys as $key) {
							$result = $db->query('SELECT IFNULL(SUM(entityvalue), 0) FROM EnergyData WHERE entity=' . $_GET['entity'] . ' AND type>' . $key . '00 AND type<' . $key . '99');
							$res = $result->fetchColumn();
							if(strlen($resultStr) == 0) $resultStr .= $res;
							else $resultStr .= "," . $res;
						}
						echo strval($resultStr);
					}
					// Returns the Energy in Wh for selected years and entity
					// ?get=energydata&type=2018&entity=10
					else if(strlen($keys[0]) == 4) {
						$resultStr = "";
						foreach($keys as $key) {
							$result = $db->query('SELECT IFNULL(SUM(entityvalue), 0) FROM EnergyData WHERE entity=' . $_GET['entity'] . ' AND type>' . $key . '0000 AND type<' . $key . '9999');
							$res = $result->fetchColumn();
							if(strlen($resultStr) == 0) $resultStr .= $res;
							else $resultStr .= "," . $res;
						}
						echo strval($resultStr);
					}
				}
			}
			else echo "0";
			
			break;
			
		case 'powerdata':
			
			// Returns String with 15 min. power data for selected day/s and entity
			// ?get=powerdata&type=20180121,20180122&entity=10
			if(isset($_GET['type']) && isset($_GET['entity'])) 
			{
				// Connect to Database
				$db = new PDO('sqlite:/srv/bx/usv.db3');
				
				// Create Array With IDs (Keys)
				$keys = explode(",", $_GET["type"]);
				
				// Create Array Full with Zeros (Values)
				$values = array_fill(0, count($keys), 0);
				
				// Build the Array -> array(type=>entityvalue, type=>entityvalue, ...)
				$resultArray = array_combine($keys, $values);
				
				// Build SQL String
				$sql = "SELECT type, entityvalue FROM PowerData WHERE entity=" . $_GET['entity'] . " AND type IN(" . implode(',', $keys) . ") LIMIT " . count($keys);

				// Fetch All Rows That Exist
				$result = $db->query($sql);
				
				foreach($result as $row) { $resultArray[$row["type"]] = $row["entityvalue"]; }
				
				echo implode(',', $resultArray);
			}
			else echo "0";

			break;
			
		case 'warningsdata':
			
			// Returns JSON Object with the latest X entries in the Warnings Table
			// ?get=warningsdata&count=5
			if(isset($_GET['count'])) 
			{
				// Connect to Database
				$db = new PDO('sqlite:/srv/bx/usv.db3');
				
				$result = $db->query("SELECT * FROM (SELECT id, type, entity, entityvalue, logtime FROM WarningsData ORDER BY id DESC LIMIT " . $_GET['count']. ") ORDER BY id ASC", PDO::FETCH_ASSOC);

				$dbh = array();
				foreach($result as $r) { $dbh[] = $r; }
				echo json_encode($dbh);
			}
			else echo "";

			break;
		
		default:
			echo "";
			break;
	}
}
// Set Switch State Command in CommandsIn
else if(isset($_GET['set']) && isset($_GET['state']))
{
	// Connect to Database
	$db = new PDO('sqlite:/srv/bx/ram/currentC.db3');
	
	// Get State to Set
	$state = $_GET['state'];
	
	if($state == '0' || $state == '1' || $state == '2') 
	{
		$sql = "";
		$set = strtolower($_GET['set']);
		if($set == "switch1")      $sql = "INSERT INTO `CommandsIn` (`type`, `entity`, `text1`, `text2`) VALUES(20736, 0, '1', '" . $state . "')";
		else if($set == "switch2") $sql = "INSERT INTO `CommandsIn` (`type`, `entity`, `text1`, `text2`) VALUES(20736, 0, '2', '" . $state . "')";
		else if($set == "switch3") $sql = "INSERT INTO `CommandsIn` (`type`, `entity`, `text1`, `text2`) VALUES(20736, 0, '3', '" . $state . "')";
		else if($set == "switch4") $sql = "INSERT INTO `CommandsIn` (`type`, `entity`, `text1`, `text2`) VALUES(20736, 0, '4', '" . $state . "')";
		
		try {
			$stmt = $db->prepare($sql);
			$stmt->execute();
			if($stmt->rowCount() == 1) echo '1';
			$stmt->closeCursor();
		} catch(PDOException $e) {}
	}
}
else echo "";