<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$data = file_get_contents('php://input');
$json = json_decode($data, true);

$mes0 = "\n\n" . $json["step0"]["question"] . ': ' . implode(', ', $json["step0"]["answers"]);
$mes1 = "\n\n" . $json["step1"]["question"] . ': ' . implode(', ', $json["step1"]["answers"]);
$mes2 = "\n\n" . $json["step2"]["question"] . ': ' . implode(', ', $json["step2"]["answers"]);
$mes3 = "\n\n" . $json["step3"]["question"] . ': ' . implode(', ', $json["step3"]["answers"]);

if (isset($_POST['user_email']) or !empty($_POST['user_email'])) {
    $userEmail = $_POST['user_email'];
}

if (isset($_POST['user_phone']) or !empty($_POST['user_phone'])) {
    $userPhone = $_POST['user_phone'];
}

// Формирование самого письма
$title = "Квиз - Din Don";
$body = "
<h2>Новое письмо с квиза - Din Don</h2>
<b>$mes0</b> <br>
<b>$mes1</b> <br>
<b>$mes2</b> <br>
<b>$mes3</b> <br>
<b>E-mail:</b> <br>
<b>Телефон:</b> $userPhone <br>
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'semenovaleksandr407@gmail.com'; // Логин на почте
    $mail->Password   = '242175rko1992'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('semenovaleksandr407@gmail.com', 'Din Don'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('sniper.semenov@ukr.net');

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    

    // Проверяем отравленность сообщения
    if ($mail->send()) {$result = "success";} 
    else {$result = "error";}
    //header('Location: thanks.html');
    } catch (Exception $e) {
        $result = "error";
        $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    }

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);