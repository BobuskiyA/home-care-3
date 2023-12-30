<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	
	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	$mail->setFrom('home@care.com', 'Home-Care');
	$mail->addAddress('maxxxymiron01@gmail.com');
	$mail->Subject = 'Feedback';

	$sender = "Client";
	if($_POST['sender'] == "caregiver"){
		$sender = "Caregiver";
	}

	if(trim(!empty($_POST['sender']))){
		$body.='<p><strong>Sender:</strong> '.$sender.'</p>';
	}
	if(trim(!empty($_POST['firstname']))){
		$body.='<p><strong>First name:</strong> '.$_POST['firstname'].'</p>';
	}
	if(trim(!empty($_POST['lastname']))){
		$body.='<p><strong>Last name:</strong> '.$_POST['lastname'].'</p>';
	}
	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Phone number:</strong> '.$_POST['phone'].'</p>';
	}
	if(trim(!empty($_POST['zip']))){
		$body.='<p><strong>Zip code:</strong> '.$_POST['zip'].'</p>';
	}
	if(trim(!empty($_POST['service']))){
		$body.='<p><strong>Zip code:</strong> '.$_POST['service'].'</p>';
	}

	$mail->Body = $body;

	if (!$mail->send()) {
		$massage = 'Error bro';
	} else {
		$massage = 'Address send';
	}

	$response = ['massage' => $massage];

	header('Content-type: application/json');
	echo json_encode($response);