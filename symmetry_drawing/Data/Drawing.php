<?php

	// session_start();
	// $session_name = json_decode($_SESSION['data'], true);

	$data = $_POST['data'];

	header('Access-Control-Allow-Origin: *'); 
	$line = '';

	error_reporting("E_ALL");

	$json = json_decode($data, true);
	foreach ($json as $key => $post) {
        foreach ($post as $k => $value) {
            // $line .= $value . "\t";
            $line .= $value . ",";
        }
        $line .= "\r\n";
    }

	$filename = "Drawing" . '.csv';
	// $filename = "PeltonWheel_" . $session_name . '.csv';

	$handle = fopen($filename, "a");
	
	fwrite($handle, $line);
	fclose($handle);

	header("Content-Type: application/json");

	echo json_encode(
				[ 'status' => true, 'message' => "Data Saved" , 'data' => $filename ]
				// [ 'status' => true, 'message' => "Data Saved" , 'data' => $json ]
			);

	exit();

?>