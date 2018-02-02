<?php

if(!empty($_GET['get']))
{	
	switch(strtolower($_GET['get']))
	{
		case 'currentstate':
			/*
				Query CurrentState Table

				?get=currentstate
					Returns the full CurrentState table
				?get=currentstate&type=273&entity=1
					Returns the value with the selected type and entity
			*/
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
			/*
				Query EnergyData Table

				?get=energydata&type=20180128,20180129&entity=10
					Returns the Energy in Wh for selected day/s and entity
				?get=energydata&type=201801&entity=10
					Returns the Energy in Wh for selected months and entity
				?get=energydata&type=2018&entity=10
					Returns the Energy in Wh for selected years and entity
				?get=energydata&entity=10
					Returns the Total Energy (since first day) in Wh for selected entity
			*/
			if(isset($_GET['type']) && isset($_GET['entity'])) 
			{
				// Create Array With IDs (Keys)
				$keys = explode(",", $_GET["type"]);
				
				// DAILY ENERGY
				if(strlen($keys[0]) == 8) 
				{
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
				// MONTHLY ENERGY
				else if(strlen($keys[0]) == 6)
				{
					$db = new PDO('sqlite:/srv/bx/usv.db3');
					
					$resultStr = "";
					
					foreach($keys as $key) 
					{
						$result = $db->query('SELECT IFNULL(SUM(entityvalue), 0) FROM EnergyData WHERE entity=' . $_GET['entity'] . ' AND type>' . $key . '00 AND type<' . $key . '99');
						
						$res = $result->fetchColumn();
						
						if(strlen($resultStr) == 0) 
							$resultStr .= $res;
						else
							$resultStr .= "," . $res;
					}
					
					echo strval($resultStr);
				}
				// YEARLY ENERGY
				else if(strlen($keys[0]) == 4)
				{
					$db = new PDO('sqlite:/srv/bx/usv.db3');
					
					$resultStr = "";
					
					foreach($keys as $key) 
					{
						$result = $db->query('SELECT IFNULL(SUM(entityvalue), 0) FROM EnergyData WHERE entity=' . $_GET['entity'] . ' AND type>' . $key . '0000 AND type<' . $key . '9999');
						
						$res = $result->fetchColumn();
						
						if(strlen($resultStr) == 0) 
							$resultStr .= $res;
						else
							$resultStr .= "," . $res;
					}
					
					echo strval($resultStr);
				}
				// NOT VALID
				else 
				{
					echo "0";
				}
			}
			// TOTAL ENERGY
			else if(isset($_GET['entity']))
			{
				$db = new PDO('sqlite:/srv/bx/usv.db3');
				
				$result = $db->query('SELECT IFNULL(SUM(entityvalue), 0) FROM EnergyData WHERE entity=' . $_GET['entity']);

				$res = $result->fetchColumn();
				
				echo strval($res);
			}
			else
			{
				echo "0";
			}

			break;

			
		case 'powerdata':
			/*
				Query PowerData Table

				?get=powerdata&type=20180121,20180122&entity=10
					Returns String with 15 min. power data from all days
					Example: 1 2 3 4 5 ... 96, 1 2 3 4 5 ... 96, ...
			*/
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
			/*
				Query WarningsData table
				
				?get=warningsdata&count=5
					Returns JSON Object with the latest X entries in the Warnings Table
			*/
			if (isset($_GET['count'])) 
			{
				// Connect to Database
				$db = new PDO('sqlite:/srv/bx/usv.db3');
				
				$result = $db->query("SELECT * FROM (SELECT id, type, entity, entityvalue, logtime FROM WarningsData ORDER BY id DESC LIMIT " . $_GET['count']. ") ORDER BY id ASC", PDO::FETCH_ASSOC);

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