<?php
require_once "../database/db.php";
session_start();

    if (isset($_POST["submit"]) & !empty($_POST)) {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $adres = $_POST["adres"];
    $password = $_POST["password"];



    $sql = "INSERT INTO `users` (email, username, password, adres) VALUES (:email, :username,:password,:adres)";
    $query = $conn->prepare($sql);


    $query->execute(array(
        ':email' => $email,
        ':username' => $username,
        ':adres' => $adres,
        ':password' => $password

    ));

}

$url = 'Location:http://localhost:8080/DORB_Logistics/index.php?page=login';
header($url);
?>

