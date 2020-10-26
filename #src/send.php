<?php
// echo '<pre>';
// print_r($_FILES);
// echo'</pre>';
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$fname =trim( $_POST['fname']);
$name = trim($_POST['name']);
$phone = trim($_POST['phone']);
$message = trim($_POST['message']);
$file = $_FILES['myfile'];
// $wtitle = strip_tags(trim($_POST['wtitle']));
// $wimg = iconv(mb_detect_encoding($_POST['wimg']), 'WINDOWS-1251', $_POST['wimg'])??'';


// Формирование самого письма
$title = "Новая заявка с сайта";
$body = "
<h2>Форма: $fname</h2><br>
<b>Имя:</b> $name<br>
<b>Почта:</b> $phone<br><br>

";
if(array_key_exists($message, $_POST)){
    $body.= "<b>Сообщение:</b><br>$message";
}
if(array_key_exists($wimg, $_POST)) {
    $wimg = $_POST['wimg'];
$wtitle = $_POST['wtitle'];
    // $imgpath ='"http://localhost:3000/img/slider-last-works"$wimg.';
    // $body.= '<img src="http://localhost:3000/img/slider-last-works'.$wimg."'<br>';
    // $mail->addAttachment($imgpath);
    $body.= "фото: $wimg<br>название:$wtitle";
}
// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    // $mail->SMTPDebug = 2;
    // $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'tantikh2020@gmail.com'; // Логин на почте
    $mail->Password   = '25Dima06'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('mail@yq.ru', 'Имя отправителя'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('tantikh2020@gmail.com');  
   //  $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен

    // Прикрипление файлов к письму
if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            // $rfile[] = "Файл $filename прикреплён";
        } else {
            // $rfile[] = "Не удалось прикрепить файл $filename";
            
        }
    }   
}

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);