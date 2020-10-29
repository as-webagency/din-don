<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$userName = $_POST['user_name'];
$userPhone = $_POST['user_phone'];
//$userEmail = $_POST['user_email'];

if (isset($_POST['user_email']) or !empty($_POST['user_email'])) {
    $userEmail = $_POST['user_email'];
} 

// Формирование самого письма
$title = "Din Don";
$body = "
<h2>Новое письмо с сайта - Din Don</h2>
<b>Имя:</b> $userName<br>
<b>Телефон:</b> $userPhone<br>
<b>E-mail:</b> $userEmail<br>
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