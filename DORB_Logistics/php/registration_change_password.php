<?php
require_once "../database/db.php";
session_start();

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $old_password = $_POST['old_password'];
    $new_password = $_POST['new_password'];
    $con_password = $_POST['con_password'];

    $stmt = $conn->prepare('SELECT * FROM users WHERE id=:id');
    $stmt->execute(array(
        ':id' => $_SESSION["userid"]
    ));
    $hallo = $stmt->fetch();
    if ($hallo["password"] == $old_password) {
        if ($new_password == $con_password) {
            $stmt = $conn->prepare("UPDATE users SET password =:hallo  WHERE  id =:id");
            $stmt->execute(array(
                ':id' => $_SESSION["userid"],
                ':hallo' => $_POST["new_password"]
            ));
            echo "Update Sucessfully";
            $url = 'Location:http://localhost:8080/DORB_Logistics/index.php?page=login';
            header($url);
        } else {
            echo "Your new Password is not match ";
        }
    } else {
        echo "Your old password is incorrect";
    }
}

