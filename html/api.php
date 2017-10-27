<?php

if(!empty($_GET['get']))
{	
	switch(strtolower($_GET['get']))
	{
		case 'currentstate':

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
else
{
	echo "";
}