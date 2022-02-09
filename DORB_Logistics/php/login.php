<?php
require_once "../database/db.php";
session_start();

$username = $_POST['username'];
$password = ($_POST['password']);

$query = $conn->prepare("SELECT id, email, password, Rol FROM users WHERE BINARY email = :username AND Password = :password");
$query->execute(array(':username' => $username, ':password' => $password));

if($query->rowCount() > 0) {
    $result = $query->fetch(    PDO::FETCH_ASSOC);

    $_SESSION['username'] = $result['email'];
    $_SESSION['userid'] = $result['id'];
    $_SESSION["Rol"] = $result["Rol"];
    $_SESSION ['ingelogd'] = true;
    $_SESSION["name"] = $_POST["username"];
    $_SESSION['last_login_timestamp'] = time();



    header('location: /DORB_Logistics/?page=home');
}

else{
    header('location: /DORB_Logistics/?page=login');
    echo "something went wrong";
}
