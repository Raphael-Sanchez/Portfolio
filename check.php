<?php

	header('content-type: application/json');

	if (!empty($_POST)) {

		$form_validation = true;

		$name = $_POST['name'];
		$headers = $_POST['mail'];
		$message = $_POST['message'];

		if (strlen($name) < 4) {
			$form_validation = false;
		}

		if(!preg_match('/^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/', $headers)) {
			$form_validation = false;
	    }

		if (empty($message)) {
			$form_validation = false;
		}

		if ($form_validation === true) {
			$reponse = 'true';
			echo json_encode(['reponse' => $reponse]);
			mail('raphael.sanchez@supinternet.fr', 'Formulaire de contact', $message, $headers);
		} else {
			$response = 'false';
			echo json_encode(['reponse' => $reponse]);
		}
	}